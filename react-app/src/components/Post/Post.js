import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";
import { getAllPosts } from "../../store/post";
import { deletePost, editPost } from "../../store/post";
import EditPostModal from "./EditPostModal/EditPostModal";
import Comment from "../Comment/Comment";
import { getAllComments } from "../../store/comment";
import { comment_icon_black, comment_icon_gray } from "./PostIcons";

const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    // const comments = useSelector(state => Object.values(state?.comments))

    useEffect(() => {
        dispatch(getAllPosts())
        // dispatch(getAllComments())
    }, [dispatch])


    const postDelete = (e) => {
       let id = e.currentTarget.value;
       dispatch(deletePost(id))
    }

    return (
        <div className="all-posts">
            {posts?.map(post => (
                <div className="post-main">
                    <div className="post-card">
                        <div className="post-top">
                            <div className="post-user">
                                user
                            </div>
                            {user_id === post.user_id ? (

                            <div className="post-top-right">
                                <button className="post-delete" value={post.id} onClick={e => postDelete(e)}>delete</button>
                                <EditPostModal post={post} />
                            </div>
                            ): null}
                        </div>

                        <div className="post-mid">
                            <div className="post-img">
                                <img className="post-img" src={post?.media_url}></img>
                            </div>
                            <div className="post-description">
                                {post?.description}
                            </div>
                        </div>

                        <div className="post-bottom">
                            <div className="post-bottom-icons"
                                onClick = {() => history.push(`/posts/${post.id}`) }>
                                {comment_icon_black}
                            </div>

                            <div className="post-comment">
                                <Comment post={post}/>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Post;
