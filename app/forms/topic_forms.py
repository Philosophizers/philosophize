from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, ValidationError, Length, Regexp

class TopicForm(FlaskForm):
    title = StringField('Title', validators=[
    DataRequired(), 
    Length(min=3, max=255, message='Title must be between 3 and 255 characters'),
    Regexp(r'^[A-Za-z0-9 ]+$', message='Title can only contain letters, numbers, and spaces')
])
    description = TextAreaField('Description', validators=[Length(max=2000, message='Description cannot be more than 2000 characters')])
