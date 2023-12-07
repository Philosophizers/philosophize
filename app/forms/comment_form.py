from flask_wtf import FlaskForm
from wtforms import TextAreaField, HiddenField
from wtforms.validators import DataRequired, Length

class CommentForm(FlaskForm):
    # The body of the comment
    content = TextAreaField('Comment', validators=[
        DataRequired(message="Comment cannot be empty"),
        Length(min=1, max=500, message="Comment must be between 1 and 500 characters")
    ])

    # Hidden fields
    user_id = HiddenField('User ID')
    topic_id = HiddenField('Topic ID')
