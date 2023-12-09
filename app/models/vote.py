from .db import db
from datetime import datetime

class Vote(db.Model):
    __tablename__ = 'votes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    date_voted = db.Column(db.Date, nullable=False, default=datetime.utcnow)

    # Relationships
    user = db.relationship('User', backref='user_votes')
    topic = db.relationship('Topic', backref='topic_votes')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'topic_id': self.topic_id,
            'date_voted': self.date_voted.isoformat()
        }