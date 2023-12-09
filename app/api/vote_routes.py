from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Vote
from datetime import datetime

vote_routes = Blueprint('votes', __name__)

@vote_routes.route('/vote', methods=['POST'])
@login_required
def cast_vote():
    topic_id = request.json.get('topic_id')
    
    # Check if the user has already voted today for any topic
    vote_today = Vote.query.filter(
        Vote.user_id == current_user.id, 
        db.func.date(Vote.date_voted) == db.func.date(datetime.utcnow())
    ).first()

    if vote_today:
        return jsonify({"message": "You have already voted today"}), 403

    # If not, proceed with creating a new vote
    new_vote = Vote(user_id=current_user.id, topic_id=topic_id)
    db.session.add(new_vote)
    db.session.commit()
    
    return jsonify(new_vote.to_dict()), 201

@vote_routes.route('/unvote', methods=['POST'])
@login_required
def remove_vote():
    topic_id = request.json.get('topic_id')
    
    # Find the user's vote for today and delete it
    vote_today = Vote.query.filter(
        Vote.user_id == current_user.id, 
        Vote.topic_id == topic_id,
        db.func.date(Vote.date_voted) == db.func.date(datetime.utcnow())
    ).first()

    if not vote_today:
        return jsonify({"message": "No vote to remove"}), 404

    db.session.delete(vote_today)
    db.session.commit()

    return jsonify({"message": "Vote removed"}), 200
