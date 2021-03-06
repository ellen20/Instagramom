from flask_wtf import FlaskForm
from wtforms import StringField
from flask_login import current_user
from wtforms.validators import DataRequired, ValidationError
from app.models import User
import re

def user_exists(form, field):
    valid_email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')
    if not (re.fullmatch(valid_email, email)):
        raise ValidationError('Please provide a valid email.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user and user.username is not current_user.username:
        raise ValidationError('Username is already in use.')
    elif len(username) > 30:
        raise ValidationError('Username cannot be over 30 characters.')
    elif len(username) < 4:
        raise ValidationError('A username must have at least 4 characters.')

def name_too_long(form, field):

    name = field.data
    if len(name) > 40:
        raise ValidationError('Full Name cannot be over 40 characters. Please use a nickname.')

def bio_too_long(form, field):
    bio = field.data

    if len(bio) > 150:
        raise ValidationError('Please limit your bio to 150 characters.')

def is_demo(form, field):
    if current_user.id == 1:
        raise ValidationError("You cannot edit the demo user's info!")

class EditProfileForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, is_demo])
    bio = StringField('bio', validators=[bio_too_long, is_demo])
    name = StringField('name', validators=[DataRequired(), name_too_long, is_demo])
