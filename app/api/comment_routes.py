from flask import Blueprint, request, jsonify
from app.models import db, Comment
from flask_login import login_required, current_user

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:topic_id>', methods=['GET'])
def get_comments(topic_id):
    comments = Comment.query.filter(Comment.topic_id == topic_id).all()
    return jsonify([comment.to_dict() for comment in comments])

@comment_routes.route('/<int:topic_id>', methods=['POST'])
@login_required
def create_comment(topic_id):
    data = request.json
    comment = Comment(
        user_id=current_user.id,
        topic_id=topic_id,
        content=data['content']
    )
    db.session.add(comment)
    db.session.commit()
    return jsonify(comment.to_dict()), 201

@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def update_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment and comment.user_id == current_user.id:
        data = request.json
        comment.content = data['content']
        db.session.commit()
        return jsonify(comment.to_dict())
    return jsonify({'message': 'Permission denied'}), 403

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get(comment_id)
    if comment and comment.user_id == current_user.id:
        db.session.delete(comment)
        db.session.commit()
        return jsonify({'message': 'Comment deleted'}), 204
    return jsonify({'message': 'Permission denied'}), 403
