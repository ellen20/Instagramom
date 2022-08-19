from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
from sqlalchemy import desc, asc
from app.forms import NewCommentForm, EditCommentForm
from app.api.auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)


@like_routes.route('/<int:postId>', methods=['POST'])
@login_required
def create_like(postId):
    like = Like.query.filter_by(user_id=current_user.id, post_id=postId).first()

    if like is None:
        new_like = Like(user_id=current_user.id, post_id=postId)
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()

@like_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_like(id):
    like_remove = Like.query.get(id)

    db.session.delete(like_remove)
    db.session.commit()
    return {'id': like_remove.id}
