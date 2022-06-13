from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Post, Follow, User, db, Comment, Like
from datetime import datetime
from app.aws_s3 import *
from sqlalchemy import desc, asc
from app.forms import NewCommentForm
from app.api.auth_routes import validation_errors_to_error_messages

comment_routes = Blueprint('comments', __name__)

@comment_routes.route("/all")
def comment_all():
    comments = Comment.query.all()
    print("????????????", comments)
    return {"comments": [ comment.to_dict() for comment in comments ]}

@comment_routes.route('/new', methods=['POST'])
@login_required
def create_comment():
    form = NewCommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # params = {
    #     'user_id' : current_user.id,
    #     'post_id' : form.data['post_id'],
    #     'description' : form.data["description"],
    #     'created_at' : datetime.now()
    # }

    if form.validate_on_submit():
        new_comment = Comment(
            user_id = current_user.id,
            post_id = form.data['post_id'],
            description = form.data["description"],
            created_at = datetime.now()
        )

        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

    return {"errors": validation_errors_to_error_messages(form.errors)},401
