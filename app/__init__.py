import logging
import os
from flask import Flask, render_template, request, session, redirect, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_apscheduler import APScheduler
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy import func
from .models import db, User, Topic, Vote
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.topic_routes import topic_routes
from .api.comment_routes import comment_routes
from .api.resource_routes import resource_routes
from .api.vote_routes import vote_routes
from .seeds import seed_commands
from .config import Config

app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

# Tell flask about our seed commands
app.cli.add_command(seed_commands)

# Configure the app
app.config.from_object(Config)
db.init_app(app)
Migrate(app, db)

# Register blueprints
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(topic_routes, url_prefix='/api/topics')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(resource_routes, url_prefix='/api/resources')
app.register_blueprint(vote_routes, url_prefix='/api/votes')

# Setup APScheduler
scheduler = APScheduler()

def select_topic_of_the_day():
    with app.app_context():
        try:
            logging.info("Running select_topic_of_the_day")
            
            # Subquery to count votes for each topic
            vote_counts = db.session.query(
                Vote.topic_id, func.count(Vote.id).label('vote_count')
            ).group_by(Vote.topic_id).subquery()

            # Query to find the topic with the highest votes
            topic_of_the_day = db.session.query(
                Topic
            ).join(
                vote_counts, Topic.id == vote_counts.c.topic_id
            ).order_by(
                vote_counts.c.vote_count.desc()
            ).first()
            
            if topic_of_the_day:
                logging.info(f"Topic of the day: {topic_of_the_day.title}")
                
                # Reset the topic_of_the_day flag for the current topic of the day
                current_topic_of_day = Topic.query.filter_by(topic_of_the_day=True).first()
                if current_topic_of_day:
                    current_topic_of_day.topic_of_the_day = False

                # Set the new Topic of the Day
                topic_of_the_day.topic_of_the_day = True

                db.session.commit()
                logging.info("Topic of the day updated successfully.")
                print(f"New Topic of the Day: {topic_of_the_day.title}")
            else:
                logging.info("No topics found to update.")
        except Exception as e:
            logging.error(f"Error selecting topic of the day: {e}")
            db.session.rollback()


# Initialize scheduler with app context
scheduler.init_app(app)
scheduler.start()

# Check if job already exists
existing_job = scheduler.get_job('select_topic_of_the_day')
if existing_job:
    scheduler.remove_job('select_topic_of_the_day')

# Schedule the job to run every 10 seconds for testing
scheduler.add_job(id='select_topic_of_the_day', func=select_topic_of_the_day, trigger='interval', seconds=10)

# Application Security
CORS(app, supports_credentials=True)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            return redirect(url, code=301)

@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True
    )
    return response

@app.route("/api/docs")
def api_help():
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { 
        rule.rule: [[method for method in rule.methods if method in acceptable_methods], app.view_functions[rule.endpoint].__doc__]
        for rule in app.url_map.iter_rules() if rule.endpoint != 'static'
    }
    return jsonify(route_list)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

@app.route('/trigger-topic-update')
def trigger_topic_update():
    select_topic_of_the_day()
    return "Topic of the day updated!"

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == "__main__":
    app.run(port=5005)
