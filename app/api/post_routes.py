from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
import boto3
import botocore
import os
from sqlalchemy import desc, asc

post_routes = Blueprint('posts', __name__)

@post_routes.route("/all")
def post_all():
    posts = Post.query.order_by(desc(Post.id))
    return {"posts": [ post.to_dict() for post in posts ]}

@post_routes.route('/new', methods=['POST'])
@login_required
def new_post():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    image = request.files["image"]

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)
    print("-------------------",upload)
    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_post = Post(user_id=current_user.id, media_url=url, description='test', created_at=datetime.now())
    db.session.add(new_post)
    db.session.commit()
    return {new_post.to_dict}


@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post_remove = Post.query.get(post_id)

    db.session.delete(post_remove)
    db.session.commit()
    return {'id': post_id}
