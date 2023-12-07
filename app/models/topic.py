# In models/topic.py

from .db import db
from datetime import datetime

class Topic(db.Model):
    __tablename__ = 'topics'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Owner of the topic
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    votes = db.Column(db.Integer, default=0)  # New field for votes
    topic_of_the_day = db.Column(db.Boolean, default=False)  # New field to mark Topic of the Day

    
    # Relationships
    user = db.relationship('User', backref='topics') 
    comments = db.relationship('Comment', back_populates='topic')
    resources = db.relationship('Resource', back_populates='topic')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,  
            'title': self.title,
            'description': self.description,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat(),
            # 'comments': [comment.to_dict() for comment in self.comments],
            # 'resources': [resource.to_dict() for resource in self.resources]
        }

