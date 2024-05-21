from flask import Blueprint, jsonify, session, request
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
import logging

auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@auth_routes.route('/')
def authenticate():
    try:
        if current_user.is_authenticated:
            return current_user.to_dict()
        return {'errors': ['Unauthorized']}, 401
    except Exception as e:
        logging.error(f"Error during authentication: {e}")
        return jsonify({'errors': ['Internal Server Error', str(e)]}), 500

@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            user = User.query.filter(User.email == form.data['email']).first()
            login_user(user)
            return user.to_dict()
        except Exception as e:
            logging.error(f"Error during login: {e}")
            return jsonify({'errors': ['Internal Server Error', str(e)]}), 500
    logging.warning(f"Login validation failed: {form.errors}")
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 401

@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        try:
            user = User(
                username=form.data['username'],
                email=form.data['email'],
                password=form.data['password']
            )
            db.session.add(user)
            db.session.commit()
            login_user(user)
            return user.to_dict()
        except Exception as e:
            logging.error(f"Error during signup: {e}")
            return jsonify({'errors': ['Internal Server Error', str(e)]}), 500
    logging.warning(f"Signup validation failed: {form.errors}")
    return jsonify({'errors': validation_errors_to_error_messages(form.errors)}), 401

@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401

@auth_routes.route('/validate-unique', methods=['POST'])
def validate_unique():
    data = request.get_json()
    email = data.get('email')
    username = data.get('username')
    errors = {}

    email_exists = User.query.filter(User.email == email).first()
    if email_exists:
        errors['email'] = 'Email address already exists.'

    username_exists = User.query.filter(User.username == username).first()
    if username_exists:
        errors['username'] = 'Username already exists.'

    return jsonify(errors)
