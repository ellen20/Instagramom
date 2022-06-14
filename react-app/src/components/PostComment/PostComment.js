import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./PostComment.css";
import { deletePost, editPost } from "../../store/post";
import Comment from "../Comment/Comment";
import { postComment, deleteComment } from "../../store/comment";
import { useParams } from 'react-router-dom';
import { comment_icon_black } from "../Post/PostIcons";
import EditCommentModal from "./EditCommentModal/EditCommentModal";

const PostComment = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const current_user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    const comments = useSelector(state => Object.values(state?.comments))

    const params = useParams()
    const post_id = params.postId
    const spec_post = posts.find(post => post.id == post_id);
    const spec_comments = comments?.filter(comment => comment.post_id == post_id)
    const [comment, setComment] = useState("");

    const newComment = () => {
        const new_comment = {
            user_id: current_user_id,
            post_id: post_id,
            description: comment,
        }

        dispatch(postComment(new_comment));
        setComment("");
    }

    const commentDelete = (e) => {
        let id = e.currentTarget.value;
        dispatch(deleteComment(id))
    }

    return (
        <div className="post-comments">
            <div className="comments-left">
                <img src={spec_post?.media_url}></img>
            </div>
            <div className="comments-right">

                {spec_comments?.map((comment, idx) =>
                <div className="comments-list" key={idx}>

                    <div>
                        {comment.user_id}
                    </div>
                    <div>
                        {comment.description}
                    </div>
                    <div>
                        {comment.created_at}
                    </div>

                    <div className="delete-comment">
                        {current_user_id == comment.user_id && (
                            <>
                            <div className="delete-comment">
                                <button value={comment.id} onClick={e => commentDelete(e)}>
                                    Delete
                                </button>
                            </div>
                            <div className="edit-comment">
                                    <EditCommentModal comment={comment}/>
                           </div>
                            </>
                        )}
                    </div>
                </div>
                )}
            </div>

            <div className="input-comment">
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    maxLength="400"
                >
                </input>
                <div
                    className="comment-submit"
                    onClick={(e) => newComment(e)}
                >
                    Post
                </div>
            </div>

        </div>
    )
}

export default PostComment;
