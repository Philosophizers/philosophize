from app.models import db, User
from werkzeug.security import generate_password_hash
from faker import Faker

fake = Faker()

def seed_users():
    # Check if the demo user already exists
    existing_user = User.query.filter_by(username='plato').first()
    if not existing_user:
        demo_user = User(
            username='plato',
            email='plato@socrates.com',
            password=generate_password_hash('demopassword')  # Hash the demo password
        )
        db.session.add(demo_user)
    
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
    db.session.execute('DELETE FROM users;')
    db.session.execute('DELETE FROM sqlite_sequence WHERE name="users";')  # Reset the auto-increment counter
    db.session.commit()
