from app.models import db, Comment
from datetime import datetime

def seed_comments():
    comments = [
        Comment(user_id=1, topic_id=1, content="Really interesting perspective on the philosophy of science."),
        Comment(user_id=2, topic_id=2, content="Existentialism has always fascinated me."),
        Comment(user_id=3, topic_id=3, content="Ethical dilemmas are crucial in understanding morality."),
        Comment(user_id=4, topic_id=4, content="Political philosophy helps us understand governance."),
        Comment(user_id=5, topic_id=5, content="Metaphysics is the foundation of philosophical thought.")
    ]

    for comment in comments:
        db.session.add(comment)
    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
