import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";
import { getAllPosts } from "../../store/post";
import { addLike, removeLike } from "../../store/like";
import Comment from "../Comment/Comment";
import { comment_icon_black, like_icon, unlike_icon} from "./PostIcons";
import PostOptionsModal from "./PostOptionsModal/PostOptionsModal";
import ReactPlayer from 'react-player';

const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session?.user?.id)
    const likes = useSelector(state => Object.values(state?.likes))
    const posts = useSelector(state => Object.values(state?.posts)).reverse()
    const [showLike, setShowLike] = useState(false);

    // const sortedPosts = posts.sort((a, b) =>
    //     b.created_at.localeCompare(a.created_at)
    // );
console.log("========", likes, user_id)
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    useEffect(() => {
        if(likes?.includes(user_id)){
            setShowLike(true)
        }
    }, [])

    const postLike = (e) => {
        let postId = e.currentTarget.value
        console.log("!!!!", postId)
        dispatch(addLike(postId));
        setShowLike(true)
    }

    const postUnlike = (e) => {
        let postId = e.currentTarget.value
        if(likes?.post_id == postId && likes?.user_id == user_id){
            dispatch((removeLike(likes.id)));
            setShowLike(false)
        }
    }

    return (
        <div className="all-posts">
            {posts?.map(post => (
                <div className="post-card">
                        <div className="post-top">
                            <div className="post-user">
                                <img className="post-user-img" src={post.image_url}></img>
                                {post?.username}
                            </div>
                            {user_id === post.user_id ? (
                                <div className="post-top-right">
                                    <PostOptionsModal post={post}/>
                                </div>
                            ): null}
                        </div>

                        <div className="post-mid">
                            {post?.media_url.slice(-3) == "mp4" || post?.media_url.slice(-3) == "mov" ? (
                            <div className="post-video">
                                <ReactPlayer
                                    controls={true}
                                    url={post?.media_url}
                                    width='100%'
                                    height='100%'
                                />
                            </div>
                            ):(
                            <div className="post-img">
                                <img className="post-img" src={post?.media_url}></img>
                            </div>
                            )}
                            <div className="post-description">
                                {post?.description}
                            </div>
                            <div className="post-icons">
                                <div className="like-icon">

                                    {showLike ? (
                                        <button className="post-like" value={post?.id} onClick={(e) => {postUnlike(e)}}>
                                        {like_icon}
                                        </button>
                                    ):(
                                        <button className="post-unlike" value={post?.id} onClick={(e) => {postLike(e)}}>
                                        {unlike_icon}
                                        </button>
                                    )}
                                </div>
                                <div className="comment-icon"
                                    onClick = {() => history.push(`/posts/${post.id}`) }>
                                    {comment_icon_black}
                                </div>
                            </div>
                        </div>

                        <div className="post-bottom">
                                <Comment post={post}/>
                        </div>
                </div>
            ))}
        </div>
    )
}

export default Post;
