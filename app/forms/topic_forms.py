from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired, Length

class TopicForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(min=3, max=255, message='Title must be between 3 and 255 characters')])
    description = TextAreaField('Description', validators=[Length(max=2000, message='Description cannot be more than 2000 characters')])
