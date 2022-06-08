from app.models import db, Post
from datetime import datetime

def seed_posts():
    post1 = Post(user_id=1, media_url='https://t3.ftcdn.net/jpg/02/00/85/24/240_F_200852490_mEh3WrMjRgBItKGHy0A5wurRjLSSP121.jpg', description='The most memorable moment...', created_at=datetime.now())
    post2 = Post(user_id=2, media_url='https://t3.ftcdn.net/jpg/02/18/91/06/240_F_218910696_h1sINl4oIu2VXpGpRH7wzZ1mXpih4cHc.jpg', description='PEEK A BOO', created_at=datetime.now())
    post3 = Post(user_id=3, media_url='https://t4.ftcdn.net/jpg/01/10/52/05/240_F_110520599_LSEtlBbLG09ZXiiWbTubjqEpD2jeCBZO.jpg', description='Twinkle Twinkle Little Star...', created_at=datetime.now())

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
