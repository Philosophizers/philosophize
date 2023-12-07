# app/api/topic_routes.py

from flask import Blueprint, request, jsonify
from app.models import db, Topic
from flask_login import login_required, current_user

topic_routes = Blueprint('topics', __name__)

@topic_routes.route('/')
def get_topics():
    topics = Topic.query.all()
    return jsonify([topic.to_dict() for topic in topics])


@topic_routes.route('/banana', methods=['POST'])
@login_required
def create_topic():
    data = request.json
    topic = Topic(user_id = current_user.id, title=data['title'], description=data['description'])
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
        db.session.delete(topic)
        db.session.commit()
        return jsonify({'message': 'Topic deleted'}), 204
    return jsonify({'message': 'Permission denied'}), 403

@topic_routes.route('/<int:id>/vote', methods=['POST'])
@login_required
def vote_topic(id):
    topic = Topic.query.get(id)
    if topic:
        topic.votes += 1  # Increment the vote count
        db.session.commit()
        return jsonify(topic.to_dict())
    return jsonify({'message': 'Topic not found'}), 404

# @topic_routes.route('/topic-of-the-day', methods=['GET'])
# def get_topic_of_the_day():
#     topic_of_the_day = Topic.query.filter(Topic.topic_of_the_day == True).first()
#     if topic_of_the_day:
#         return jsonify(topic_of_the_day.to_dict())
#     return jsonify({'message': 'No topic of the day found'}), 404


# @topic_routes.route('/topic-of-the-day')
# def get_topic_of_the_day():
#     topic_of_the_day = Topic.query.filter_by(topic_of_the_day=True).first()
#     if topic_of_the_day:
#         return jsonify(topic_of_the_day.to_dict())
#     else:
#         return jsonify({"message": "No topic of the day found"}), 404

@topic_routes.route('/topic-of-the-day', methods=['GET'])
def get_topic_of_the_day():
    topic_of_the_day = Topic.query.filter(Topic.topic_of_the_day == True).first()
    if topic_of_the_day:
        return jsonify(topic_of_the_day.to_dict())
    return jsonify({'message': 'No topic of the day found'}), 404

@topic_routes.route('/set-topic-of-the-day/<int:id>', methods=['POST'])
@login_required
def set_topic_of_the_day(id):
    # Clear the existing topic of the day
    Topic.query.filter_by(topic_of_the_day=True).update({'topic_of_the_day': False})
    # Set the new topic of the day
    topic = Topic.query.get(id)
    if topic:
        topic.topic_of_the_day = True
        db.session.commit()
        return jsonify(topic.to_dict()), 200
    else:
        return jsonify({'message': 'Topic not found'}), 404


# @topic_routes.route('/<int:id>', methods=['PUT'])
# @login_required
# def update_topic(id):
#     topic = Topic.query.get(id)
#     data = request.json
#     topic.title = data['title']
#     topic.description = data['description']
#     db.session.commit()
#     return jsonify(topic.to_dict())

# @topic_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_topic(id):
#     topic = Topic.query.get(id)
#     db.session.delete(topic)
#     db.session.commit()
#     return jsonify({'message': 'Topic deleted'})