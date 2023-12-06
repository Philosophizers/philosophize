# app/api/topic_routes.py

from flask import Blueprint, request, jsonify
from app.models import db, Topic
from flask_login import login_required, current_user

topic_routes = Blueprint('topics', __name__)

@topic_routes.route('/', methods=['GET'])
def get_topics():
    topics = Topic.query.all()
    return jsonify([topic.to_dict() for topic in topics])

@topic_routes.route('/', methods=['POST'])
@login_required
def create_topic():
    data = request.json
    topic = Topic(title=data['title'], description=data['description'])
    db.session.add(topic)
    db.session.commit()
    return jsonify(topic.to_dict())

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
