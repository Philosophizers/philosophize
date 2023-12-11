import os
from flask import Flask, render_template, request, session, redirect
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from flask_apscheduler import APScheduler
from .models import db, User, Topic, Vote
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .seeds import seed_commands
from .config import Config
from sqlalchemy.exc import SQLAlchemyError
from flask_sqlalchemy import SQLAlchemy

from .api.topic_routes import topic_routes
from .api.comment_routes import comment_routes
from .api.resource_routes import resource_routes
from .api.vote_routes import vote_routes




app = Flask(__name__, static_folder='../react-app/build', static_url_path='/')


# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'



@login.user_loader
def load_user(id):
    return User.query.get(int(id))



# Tell flask about our seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(topic_routes, url_prefix='/api/topics')
app.register_blueprint(comment_routes, url_prefix='/api/comments')
app.register_blueprint(resource_routes, url_prefix='/api/resources')
app.register_blueprint(vote_routes, url_prefix='/api/votes')
# db.init_app(app)
db = SQLAlchemy(app)
Migrate(app, db)




scheduler = APScheduler()

# Scheduled function
# def select_topic_of_the_day():
#     # Logic to select the topic with the highest votes
#     topic_of_the_day = Topic.query.order_by(Topic.votes.desc()).first()
#     if topic_of_the_day:
#         # Reset topic_of_the_day flag for all topics
#         Topic.query.update({Topic.topic_of_the_day: False})
#         # Set the new Topic of the Day
#         topic_of_the_day.topic_of_the_day = True
#         # Reset votes for all topics
#         Topic.query.update({Topic.votes: 0})
#         Vote.query.delete()
#         db.session.commit()

def select_topic_of_the_day():
    try:
        # Start a transaction
        db.session.begin(subtransactions=True)

        # Logic to select the topic with the highest votes
        topic_of_the_day = Topic.query.order_by(Topic.votes.desc()).first()
        
        if topic_of_the_day:
            # Reset the topic_of_the_day flag for the current topic of the day
            current_topic_of_day = Topic.query.filter_by(topic_of_the_day=True).first()
            if current_topic_of_day:
                current_topic_of_day.topic_of_the_day = False

            # Set the new Topic of the Day
            topic_of_the_day.topic_of_the_day = True
            topic_of_the_day.votes = 0  # You might want to reset votes here as well

            # Reset votes for all topics
            Topic.query.update({Topic.votes: 0})

            # Delete all votes in preparation for the next day
            Vote.query.delete()

            # Commit all changes if everything is okay
            db.session.commit()
    except SQLAlchemyError as e:
        # Rollback the transaction in case of an error
        db.session.rollback()
        # Log the error
        print("Error selecting topic of the day:", str(e))






scheduler.init_app(app)
scheduler.start()


scheduler.add_job(id='select_topic_of_the_day', func=select_topic_of_the_day, trigger='cron', hour=23, minute=59)


# Application Security
CORS(app, supports_credentials=True)


# Since we are deploying with Docker and Flask,
# we won't be using a buildpack when we deploy to Heroku.
# Therefore, we need to make sure that in production any
# request made over http is redirected to https.
# Well.........
@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response


@app.route("/api/docs")
def api_help():
    """
    Returns all API routes and their doc strings
    """
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = { rule.rule: [[ method for method in rule.methods if method in acceptable_methods ],
                    app.view_functions[rule.endpoint].__doc__ ]
                    for rule in app.url_map.iter_rules() if rule.endpoint != 'static' }
    return route_list


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')



app.cli.add_command(seed_commands)