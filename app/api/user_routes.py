from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/search', methods=['PUT'])
@login_required
def search():

    data = request.json['input']

    users = User.query.filter(User.username.ilike(f'%{data}%'), User.username != current_user.username).all()
    users_name = User.query.filter(User.fullname.ilike(f'%{data}%'), User.fullname != current_user.fullname).all()

    combined_users = list(set(users + users_name))

    return {'users': [user.to_dict() for user in combined_users]}
