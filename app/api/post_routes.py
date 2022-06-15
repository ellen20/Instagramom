from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
from sqlalchemy import desc, asc

post_routes = Blueprint('posts', __name__)

@post_routes.route("/all")
def get_post_all():
    posts = Post.query.order_by(Post.id.desc()).all()
    print("=================",posts)
    return {"posts": [ post.to_dict() for post in posts ]}

@post_routes.route("/<int:post_id>")
def get_one_post(post_id):
    post = Post.query.get(post_id)
    print("==========",post)
    # if post:
    return {"post": post }
    # else:
    #     return {"errors": ["Not found"]}, 404

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
    if "url" not in upload:
        return upload, 400

    url = upload["url"]

    new_post = Post(user_id=current_user.id, media_url=url, description=request.form.get('description'), created_at=datetime.now())
    db.session.add(new_post)
    db.session.commit()

    return new_post.to_dict()


@post_routes.route('/<int:post_id>', methods=['DELETE'])
@login_required
def delete_post(post_id):
    post_remove = Post.query.get(post_id)

    db.session.delete(post_remove)
    db.session.commit()
    return {'id': post_id}

@post_routes.route('/<int:post_id>', methods=['PUT'])
@login_required
def edit_post(post_id):

    data = request.json

    edit_post = Post.query.get(post_id)

    edit_post.description = request.json['description']

    db.session.commit()

    return edit_post.to_dict()
