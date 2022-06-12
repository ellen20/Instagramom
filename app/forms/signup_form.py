from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re ###

def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')

def valid_email(form, field):
    # Checking if input valid email
    email = field.data
    valid_email = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
    if not (re.fullmatch(valid_email, email)):
        raise ValidationError('Please provide a valid email.')

def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def valid_username(form, field):
    #Checking if input valid username
    username = field.data
    if len(username) > 40:
        raise ValidationError('Username cannot be over 40 characters.')
    elif len(username) < 5:
        raise ValidationError('A username must have at least 5 characters.')

def fullname_too_long(form, field):
    fullname = field.data
    if len(fullname) > 40:
        raise ValidationError('Full Name cannot be over 40 characters. Please use a nickname.')

def password_too_short(form, field):
    password = field.data
    if len(password) < 5:
        raise ValidationError('Password must be at least five characters long.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists, valid_username])
    fullname = StringField('name', validators=[DataRequired(), fullname_too_long])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired(), password_too_short])
