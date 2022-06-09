import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";

const Post = () => {
    const history = useHistory();
    const emojis = useRef([]);
    const dispatch = useDispatch();

    return (
        <h1>Post</h1>
    )
}

export default Post;
