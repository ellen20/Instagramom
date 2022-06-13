import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./PostComment.css";
import { getAllPosts } from "../../store/post";
import { deletePost, editPost } from "../../store/post";
import Comment from "../Comment/Comment";
import { getAllComments } from "../../store/comment";
import { useParams } from 'react-router-dom';

const PostComment = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    // const comments = useSelector(state => Object.values(state?.comments))
    const params = useParams()
    const post_id = params.postId
    useEffect(() => {

    }, [dispatch])


    return (
        <div className="post-comments">


        </div>
    )
}

export default PostComment;
