import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";
import { getAllPosts } from "../../store/post";
import { deletePost } from "../../store/post";
import EditPostModal from "./EditPostModal/EditPostModal";
import Comment from "../Comment/Comment";
import { comment_icon_black, comment_icon_gray } from "./PostIcons";
import PostOptionsModal from "./PostOptionsModal/PostOptionsModal";

const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    const postDelete = (e) => {
       let id = e.currentTarget.value;
       dispatch(deletePost(id))
    }

    const openPostOptions = () => {
        setShowOptions(true)
    }

    const closePostOptions = () => {
        if (!showOptions) return; // do nothing if modal already closed
        setShowOptions(false); // else close modal

    };

    return (
        <div className="all-posts">

            {posts?.map(post => (
                <div className="post-main">
                    <div className="post-card">
                        <div className="post-top">
                            <div className="post-user">
                                <img className="post-user-img" src={post.image_url}></img>
                                {post?.username}
                            </div>
                            {user_id === post.user_id ? (

                            <div className="post-top-right">
                                    {/* <img
                                        className="post-options2"
                                        onClick={openPostOptions}
                                        src="https://img.icons8.com/material-two-tone/24/000000/more.png"
                                    /> */}
                                <PostOptionsModal post={post}/>
                                {/* <button className="post-delete" value={post.id} onClick={e => postDelete(e)}>delete</button>
                                <EditPostModal post={post} /> */}
                                    {/* {showOptions && (
                                        <>
                                            <div className="background">
                                                <div className="postOptionsModal">
                                                    <div
                                                        onClick={() => setShowOptions(false)}
                                                        className="postOptionsModalBckg"
                                                    ></div>
                                                    <div className="actualModalComponent">
                                                        <PostModal post={post} setShowOptions={closePostOptions} />
                                                        <div
                                                            className="cancelPostButton"
                                                            onClick={() => setShowOptions(false)}
                                                        >
                                                            Cancel
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )} */}

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
