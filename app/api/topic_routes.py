from flask import Blueprint, logging, request, jsonify
from app.models import db, Topic, Vote
from flask_login import login_required, current_user
from datetime import datetime


topic_routes = Blueprint('topics', __name__)

def format_topic_with_votes(topic):
    related_votes = {'votes': [vote.to_dict() for vote in topic.votes]}
    return {**topic.to_dict(), **related_votes}

@topic_routes.route('/')
def get_topics():
    topics = Topic.query.all()
    topics_with_votes = [format_topic_with_votes(topic) for topic in topics]
    return jsonify(topics_with_votes)

@topic_routes.route('/banana', methods=['POST'])
@login_required
def create_topic():
    data = request.json
    topic = Topic(user_id=current_user.id, title=data['title'], description=data['description'])
    db.session.add(topic)
    db.session.commit()
    return jsonify(topic.to_dict())

@topic_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_topic(id):
    topic = Topic.query.get(id)
    if topic and topic.user_id == current_user.id:
        data = request.json
        topic.title = data['title']
        topic.description = data['description']
        db.session.commit()
        return jsonify(topic.to_dict())
    return jsonify({'message': 'Permission denied'}), 403

@topic_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_topic(id):
    topic = Topic.query.get(id)
    if topic and topic.user_id == current_user.id:
        # Fetch and delete all votes associated with this topic
        votes = Vote.query.filter_by(topic_id=id).all()
        for vote in votes:
            db.session.delete(vote)
        db.session.commit()

        # Now, delete the topic itself
        db.session.delete(topic)
        db.session.commit()

        return jsonify({'message': 'Topic and associated votes deleted'}), 204
    else:
        return jsonify({'message': 'Permission denied'}), 403

@topic_routes.route('/topic-of-the-day', methods=['GET'])
def get_topic_of_the_day():
    try:
        topic_of_the_day = Topic.query.filter_by(topic_of_the_day=True).first()
        if topic_of_the_day:
            return jsonify(topic_of_the_day.to_dict())
        return jsonify({'message': 'No topic of the day found'}), 404
    except Exception as e:
        logging.error(f"Error retrieving topic of the day: {e}")
        return jsonify({'message': 'Internal Server Error', 'error': str(e)}), 500

@topic_routes.route('/set-topic-of-the-day/<int:id>', methods=['POST'])
# @login_required
def set_topic_of_the_day(id):
    # Clear the existing topic of the day
    Topic.query.filter_by(topic_of_the_day=True).update({'topic_of_the_day': False})
    # Set the new topic of the day
    topic = Topic.query.get(id)
    if topic:
        topic.topic_of_the_day = True
        db.session.commit()
        return jsonify(topic.to_dict()), 200
    return jsonify({'message': 'Topic not found'}), 404

@topic_routes.route('/<int:topic_id>/vote', methods=['POST'])
@login_required
def vote(topic_id):
    today = datetime.utcnow().date()
    vote = Vote.query.filter_by(user_id=current_user.id, topic_id=topic_id, date_voted=today).first()
    
    if vote:
        return jsonify({"message": "You have already voted today"}), 403

    try:
        new_vote = Vote(user_id=current_user.id, topic_id=topic_id, date_voted=today)
        db.session.add(new_vote)
        db.session.commit()
        updated_topic = Topic.query.get(topic_id)
        return jsonify(format_topic_with_votes(updated_topic)), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@topic_routes.route('/<int:topic_id>/unvote', methods=['POST'])
@login_required
def unvote(topic_id):
    vote = Vote.query.filter_by(user_id=current_user.id, topic_id=topic_id).first()
    
    if not vote:
        return jsonify({"message": "You haven't voted for this topic"}), 404

    db.session.delete(vote)
    db.session.commit()
    updated_topic = Topic.query.get(topic_id)
    return jsonify(format_topic_with_votes(updated_topic)), 200
