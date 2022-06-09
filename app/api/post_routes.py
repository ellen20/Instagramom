from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
import boto3
import botocore
import os

post_routes = Blueprint('posts', __name__)


@post_routes.route('/new', methods=['POST'])
@login_required
def new_post():

    if "file" not in request.files:
        return "No user_file key in request.files"

    file = request.files['file']

    # data = request.json

    # post = Post(user_id=current_user.id, media_url=data['media_url'], description=data['description'], createdAt=datetime.now())

    if file:
        file_url = upload_file_to_s3(file, os.environ.get("S3_BUCKET"))
        post = Post(user_id=current_user.id, media_url=file_url, description=request.form.get('description'), createdAt=datetime.now())
        db.session.add(post)
        db.session.commit()

    return {'msg': 'ok'}

# @post_routes.route('/<int:post_id>', methods=['DELETE'])
# @login_required
# def delete_posts(post_id):

#     post = Post.query.get(post_id)

#     db.session.delete(post)
#     db.session.commit()

#     return following_posts()
