from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
from sqlalchemy import desc, asc
from app.forms import NewCommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/<int:post_id>')
@login_required
def post_comments(post_id):

    comments = Comment.query.filter(Comment.post_id == post_id).order_by(Comment.id.desc()).all()
    return {"comments": [ comment.to_dict() for comment in comments ]}

@comment_routes.route('/new', methods=['POST'])
@login_required
def create_comment():
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    params = {
        'user_id' : form.data['user_id'],
        'post_id' : form.data['post_id'],
        'description' : form.data["description"],
        'created_at' : datetime.now()
    }

    if form.validate_on_submit():
        new_comment = Comment(**params)

        db.session.add(new_comment)
        db.session.commit()
        return new_comment.to_dict()
    return {"errors": validation_errors_to_error_messages(form.errors)},401

@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_comment(comment_id):
    comment_remove = Comment.query.get(comment_id)

    db.session.delete(comment_remove)
    db.session.commit()
    return {'id': comment_id}

@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):

    data = request.json

    edit_post = Post.query.get(comment_id)

    edit_post.description = request.json['description']

    db.session.commit()

    return edit_post.to_dict()
