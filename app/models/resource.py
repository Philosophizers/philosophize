# In models/resource.py

from .db import db
from datetime import datetime

class Resource(db.Model):
    __tablename__ = 'resources'

    id = db.Column(db.Integer, primary_key=True)
    topic_id = db.Column(db.Integer, db.ForeignKey('topics.id'), nullable=False)
    name = db.Column(db.String(255), nullable=False)
    resource_type = db.Column(db.String(50), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    topic = db.relationship('Topic', back_populates='resources')

    def to_dict(self):
        return {
            'id': self.id,
            'topic_id': self.topic_id,
            'name': self.name,
            'resource_type': self.resource_type,
            'url': self.url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
