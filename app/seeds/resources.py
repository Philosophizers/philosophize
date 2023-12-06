from app.models import db, Resource
from datetime import datetime

def seed_resources():
    resources = [
        Resource(topic_id=1, name="Science and Philosophy Paper", resource_type="pdf", url="http://example.com/science_paper.pdf"),
        Resource(topic_id=2, name="Existentialism in Modern Times", resource_type="article", url="http://example.com/existentialism_article"),
        Resource(topic_id=3, name="Ethical Theories Explained", resource_type="video", url="http://example.com/ethics_video"),
        Resource(topic_id=4, name="Political Philosophy Overview", resource_type="link", url="http://example.com/political_philosophy"),
        Resource(topic_id=5, name="Metaphysics Basics", resource_type="article", url="http://example.com/metaphysics_basics")
    ]

    for resource in resources:
        db.session.add(resource)
    db.session.commit()

def undo_resources():
    db.session.execute('TRUNCATE resources RESTART IDENTITY CASCADE;')
    db.session.commit()
