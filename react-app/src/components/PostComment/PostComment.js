import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./PostComment.css";
import { postComment, deleteComment, getComments } from "../../store/comment";
import { useParams } from 'react-router-dom';
import EditCommentModal from "./EditCommentModal/EditCommentModal";
import ReactPlayer from "react-player";

const PostComment = ({posts}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const current_user_id = useSelector(state => state.session?.user?.id)
    const comments = useSelector(state => Object.values(state?.comments))
    const postsArr = Object.values(posts)
    const params = useParams()
    const post_id = params.postId
    const spec_post = postsArr.find(post => post.id == post_id);
    const imgUrl = spec_post?.media_url
    const spec_comments = comments?.filter(comment => comment.post_id == post_id)
    const [comment, setComment] = useState("");
    const date = new Date();

    useEffect(() => {
        dispatch(getComments(post_id))
    }, [dispatch])

    if (!posts[post_id]) {
            history.push("/page-not-found");
        }

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

    const scroll = () => {
        const container = document.querySelector('.comments-section');
        if (container) {
            container.scrollTop = container.scrollHeight
        }
    }

    useEffect(() => {
        scroll()
    })

    return (
        <div className="post-main">
            <div className="post-comments">
                <div className="comments-left">
                    {imgUrl.slice(-4) === ".mp4" ? (
                        <ReactPlayer
                        className="comment-img"
                        width='100%'
                        height='100%'
                        url={spec_post?.media_url} />
                    ):(
                        <img
                        className="comment-img"
                        src={spec_post?.media_url} />
                    )}
                </div>

                <div className="comments-right">
                    <div className="comments-user">
                        <img className="comments-user-img" src={spec_post?.image_url}></img>
                        {spec_post?.username}
                    </div>

                    <div className="comments-section">
                        {spec_comments?.map((comment, idx) =>
                            <div className="comment-lists" key={idx}>
                                <div className="comment-user-info">
                                    <img className="comment-user-img" src={comment.image_url}></img>
                                    {comment.username}
                                </div>
                                <div className="comment">{comment.description}</div>
                                <div className="comment-info">
                                    <span className="comment-time">
                                        {comment?.created_at.split(" ").slice(1, 4).join(" ")}</span>
                                    {current_user_id == comment.user_id && (
                                    <>
                                        <button
                                            className="delete-comment"
                                            value={comment.id}
                                            onClick={e => commentDelete(e)}>
                                            <i class="fa-solid fa-trash-can"></i>
                                        </button>

                                        <div className="edit-comment">
                                            <EditCommentModal comment={comment}/>
                                        </div>
                                    </>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="comment-right-bot">
                        <input
                            className="input-comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Add a comment..."
                            maxLength="400">
                        </input>

                        <div
                            className="comment-submit"
                            onClick={(e) => newComment(e)}>
                            Post
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostComment;
