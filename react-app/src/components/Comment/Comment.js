import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Comment.css";
import { getAllPosts } from "../../store/post";
import { deletePost, editPost } from "../../store/post";
import { getAllComments } from "../../store/comment";

const Comment = ({post}) => {
    const post_id = post.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    const comments = useSelector(state => Object.values(state?.comments))


    useEffect(() => {
        dispatch(getAllComments())

    }, [dispatch])

    return (
        <div className="post-comment-main">
            {comments?.map(comment => (
               {comment}
            ))}

        </div>
    )
}

export default Comment;
