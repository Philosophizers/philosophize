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

    default_topic_of_the_day = Topic(
        user_id=1, 
        title="Is it truly better to have loved and lost than to have never loved at all?",
        description="The classic question regarding love, often misattributed to William Shakespeare is actually written by the lesser known Alfred Lord Tennyson. Though the subject matter pertains to romantic love, the question can be applied to any kind of love or even other emotions. Is it better to have had money and lost it than to have never had money at all? Is it better to have driven your dream car and lose it than to have never driven it at all? What do you think?",
        topic_of_the_day=True  # Set this topic as the default topic of the day
    )
    db.session.add(default_topic_of_the_day)

    for topic in topics:
        db.session.add(topic)
    db.session.commit()

def undo_topics():
    db.session.execute('TRUNCATE topics RESTART IDENTITY CASCADE;')
    db.session.commit()
