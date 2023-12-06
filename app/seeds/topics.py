from app.models import db, Topic
from datetime import datetime

def seed_topics():
    topics = [
        Topic(user_id = 1, title="Philosophy of Science", description="Discussion on the philosophy of science."),
        Topic(user_id = 2, title="Existentialism", description="Exploring existentialist thoughts and ideas."),
        Topic(user_id = 3, title="Ethics and Morality", description="Debate on ethics and moral philosophy."),
        Topic(user_id = 4, title="Political Philosophy", description="Discussions on political theory and philosophy."),
        Topic(user_id = 5, title="Metaphysics", description="Exploring the fundamental nature of reality.")
    ]

    for topic in topics:
        db.session.add(topic)
    db.session.commit()

def undo_topics():
    db.session.execute('TRUNCATE topics RESTART IDENTITY CASCADE;')
    db.session.commit()
