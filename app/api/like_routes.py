from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
from sqlalchemy import desc, asc
from app.forms import NewCommentForm, EditCommentForm
from app.api.auth_routes import validation_errors_to_error_messages

like_routes = Blueprint('likes', __name__)

@like_routes.route("/all")
def get_post_all():
    likes = Like.query.order_by(Like.id).all()
    return {"likes": [ like.to_dict() for like in likes ]}

@like_routes.route('/<int:postId>', methods=['POST'])
@login_required
def create_like(postId):
    like = Like.query.filter_by(user_id=current_user.id, post_id=postId).first()

    if like is None:
        new_like = Like(user_id=current_user.id, post_id=postId)
        db.session.add(new_like)
        db.session.commit()
        return new_like.to_dict()

    # post = Post.query.get(postId)
    # # user = User.query.get(current_user.id)
    # post.likes_id = current_user.id
    # # post.likes_id.append(user)
    # db.session.commit()
    # return post.to_dict()

@like_routes.route('/<int:postId>', methods=['DELETE'])
@login_required
def delete_like(postId):
    # like_remove = Like.query.get(id)
    like_remove = Like.query.filter_by(user_id=current_user.id, post_id=postId).first()
    db.session.delete(like_remove)
    db.session.commit()
    return like_remove.to_dict()
    # post = Post.query.get(post_id)
    # user = User.query.get(current_user.id)

    # post.post_likes.remove(user)
    # db.session.commit()

    # return post.to_dict()
