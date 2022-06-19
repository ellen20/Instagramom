from app.models import db, Post
from datetime import datetime

def seed_posts():
    post1 = Post(user_id=1, media_url='https://images.pexels.com/photos/451853/baby-hand-infant-child-451853.jpeg?', description='The most memorable moment...', created_at=datetime.now())
    post2 = Post(user_id=2, media_url='https://images.pexels.com/photos/3763583/pexels-photo-3763583.jpeg', description='PEEK A BOO', created_at=datetime.now())
    post3 = Post(user_id=3, media_url='https://images.pexels.com/photos/286625/pexels-photo-286625.jpeg', description="Happy Father's Day", created_at=datetime.now())
    post4 = Post(user_id=4, media_url='https://images.pexels.com/photos/159767/baby-cute-moe-brilliant-159767.jpeg', description='As sweet as sugar, as cute as a cupcake.', created_at=datetime.now())
    post5 = Post(user_id=5, media_url='https://images.pexels.com/photos/3934002/pexels-photo-3934002.jpeg', description='Hey!Look at my cool hat', created_at=datetime.now())
    post6 = Post(user_id=6, media_url='https://images.pexels.com/photos/36039/baby-twins-brother-and-sister-one-hundred-days.jpg', description='Yes! We are TWINS!No more No less', created_at=datetime.now())
    post7 = Post(user_id=7, media_url='https://images.pexels.com/photos/459957/pexels-photo-459957.jpeg', description='Wohooooooo OWL', created_at=datetime.now())
    post8 = Post(user_id=8, media_url='https://images.pexels.com/photos/459905/pexels-photo-459905.jpeg', description='Happy Easter!', created_at=datetime.now())
    post9 = Post(user_id=9, media_url='https://images.pexels.com/photos/1133721/pexels-photo-1133721.jpeg', description='You are my sunshine', created_at=datetime.now())

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)
    db.session.add(post5)
    db.session.add(post6)
    db.session.add(post7)
    db.session.add(post8)
    db.session.add(post9)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
