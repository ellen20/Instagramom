from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import ValidationError, DataRequired
import  datetime

def description_too_long(form, field):
    description = field.data
    if len(description) > 400:
        raise ValidationError('Comment cannot be over 400 characters.')

class EditCommentForm(FlaskForm):
    description = StringField('description', validators=[DataRequired()])
