<h1 align="center"><img height="22px" width="22px" src="https://camo.githubusercontent.com/c9dacf0f25a1489fdbc6c0d2b41cda58b77fa210a13a886d6f99e027adfbd358/68747470733a2f2f6564656e742e6769746875622e696f2f537570657254696e7949636f6e732f696d616765732f7376672f696e7374616772616d2e737667" alt=""></img>  Instagramom</h1>

Instagramom is a full-stack web application clone of <a href="https://www.instagram.com/">instagram.com</a>. Instagramom allows all moms share their moments such as posting their kid's photos and comments.

<a href="https://my-instagramom.herokuapp.com/login" target="_blank"><strong>Explore the website »</strong></a><br/>

<details open="open">
  <summary id="table-of-contents">Table of Contents</summary>
  <ol>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#future-features">Future Features</a></li>
  </ol>
 </details>
 
## Technologies Used

![Python](https://img.shields.io/badge/-Python-F9DC3E.svg?logo=Python&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

## Getting started

1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

   ```bash
   pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
   ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Features
[Back to top](#table-of-contents)

<a href="https://github.com/ellen20/Instagramom/wiki">See wiki page for feature list</a>

### Splash Page
Landing page for when users first arrive at Instagramom. Users can sign in, sign up, or explore the site through a demo user without signing up. Check out the live site <a href="https://my-instagramom.herokuapp.com/login" target="_blank">here</a>! 

<img width="1257" alt="Screen Shot 2022-06-17 at 8 27 36 PM" src="https://user-images.githubusercontent.com/66989321/174418838-2c63ace4-12fe-444f-9ff9-e5626a34e7e0.png">

### Home Page
Users can view all posts in this home page and leave comments for each post. Users also can edit and delete the post that they made.

<img width="1257" alt="Screen Shot 2022-06-17 at 8 26 01 PM" src="https://user-images.githubusercontent.com/66989321/174418876-9855e882-0ae3-4bcf-a52f-ef847b4d2025.png">

### Comment Page
Users can see all comments for a spefic post and edit or delete their comment that they left.

<img width="1257" alt="Screen Shot 2022-06-17 at 11 46 11 PM" src="https://user-images.githubusercontent.com/66989321/174423187-0b1a2402-b00a-4200-91c6-00bc83e90355.png">

## Future Features

### Likes Features
* Users can like or unlike all post

### Follows Features 
* Users can follow or unfllow other users

### User Profile Page
* Users can view specific user's profile information 
* User can change user's image
* Users can view all posts that they made
* Follow or unfollow user

### Search Bar
* Users can live search in navigation bar
* Users can search other users information

### Live Chat
* Users can live messaging with followers or followees
