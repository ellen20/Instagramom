from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import ValidationError, DataRequired
import  datetime

def description_too_long(form, field):
    description = field.data
    if len(description) > 400:
        raise ValidationError('Comment cannot be over 400 characters.')

class NewCommentForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    post_id = IntegerField('post_id', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit')
