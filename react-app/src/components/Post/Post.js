import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";
import { getAllPosts } from "../../store/post";
import Comment from "../Comment/Comment";
import { comment_icon_black} from "./PostIcons";
import PostOptionsModal from "./PostOptionsModal/PostOptionsModal";
import ReactPlayer from 'react-player';

const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts)).reverse()
    const [showOptions, setShowOptions] = useState(false);

    // const sortedPosts = posts.sort((a, b) =>
    //     b.created_at.localeCompare(a.created_at)
    // );

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    return (
        <div className="all-posts">
            {/* <ReactPlayer controls={true} url='https://instagramombucket.s3.amazonaws.com/0e50fb21f6b347ad90a88e0d2e140218.mp4
          	' /> */}
            {posts?.map(post => (
                // <div className="post-main">
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
                            <div className="post-icons"
                                onClick = {() => history.push(`/posts/${post.id}`) }>
                                {comment_icon_black}
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
