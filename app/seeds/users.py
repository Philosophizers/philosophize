from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker

fake = Faker()

def seed_users():
    # Example: Seeding 10 users
    for _ in range(10):
        user = User(
            username=fake.user_name(),
            email=fake.email(),
            password=generate_password_hash(fake.password())
        )
        db.session.add(user)
    db.session.commit()

def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
