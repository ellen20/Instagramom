import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Comment.css";
import { getAllPosts } from "../../store/post";
import { deletePost, editPost } from "../../store/post";
import { getComments, postComment } from "../../store/comment";

const Comment = ({post}) => {
    const post_id = post.id;
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    const comments = useSelector(state => Object.values(state?.comments))
    const spec_comments = comments?.filter(comment => comment.post_id === post.id)
    const [comment, setComment] = useState("");

    useEffect(() => {
        dispatch(getComments(post_id))
    }, [dispatch])

    const newComment = () => {
        const new_comment = {
            user_id: user_id,
            post_id: post.id,
            description: comment,
        }

        dispatch(postComment(new_comment));
        setComment("");

    }

    return (
        <div className="post-comment-main">
            {spec_comments?.map(comment => (
               <div>
                   {comment.description}
                   <span className="comment-time">{comment?.created_at.split(" ").slice(1, 4).join(" ")}</span>
                </div>
            ))}
            <div className="input-comments">
                <input
                    className="input-comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    maxLength="400"
                >
                </input>
                <div
                    className="comment-submit"
                    onClick={(e) => newComment()}
                >
                    Post
                </div>
            </div>
        </div>
    )
}

export default Comment;
