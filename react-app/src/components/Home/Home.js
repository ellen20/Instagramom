import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Post from "../Post/Post";
import UserList from "../UsersList";
import "./Home.css";

const Home = () => {
    const history = useHistory();
    const emojis = useRef([]);
    const dispatch = useDispatch();

    return (
        <div className="home-page">
            <div className="post-section">
                <Post />
            </div>
            <div className="user-list-section">
                <UserList />
            </div>
        </div>
    )
}

export default Home;
