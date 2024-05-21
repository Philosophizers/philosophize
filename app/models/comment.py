from .db import db
from datetime import datetime
from .user import User

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete='CASCADE'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id', ondelete='CASCADE'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = db.relationship('User', backref='comments')
    topic = db.relationship('Topic', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'topic_id': self.topic_id,
            'content': self.content,
            'username': self.user.username,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
