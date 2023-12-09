from app.models import db, Vote
from datetime import datetime
from random import randint

def seed_votes():
    for user_id in range(1, 11): 
        vote = Vote(
            user_id=user_id,
            topic_id=randint(1, 5),
            date_voted=datetime.utcnow()
        )
        db.session.add(vote)
    db.session.commit()

def undo_votes():
    db.session.execute('TRUNCATE votes RESTART IDENTITY CASCADE;')
    db.session.commit()