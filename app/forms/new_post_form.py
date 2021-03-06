from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from  wtforms.validators import DataRequired, ValidationError
import  datetime

def description_too_long(form, field):
    description = field.data
    if len(description) > 400:
        raise ValidationError('A Caption cannot be over 400 characters.')

class NewPostForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    media_url = StringField('media_url', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired(), description_too_long])
    created_at = DateTimeField('created_at', validators=[DataRequired()], default=datetime.datetime.now)
    submit = SubmitField('submit')
