import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";
import { getAllPosts } from "../../store/post";
import Comment from "../Comment/Comment";
import { comment_icon_black} from "./PostIcons";
import PostOptionsModal from "./PostOptionsModal/PostOptionsModal";

const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))
    const [showOptions, setShowOptions] = useState(false);

    const sortedPosts = posts.sort((a, b) =>
        b.created_at.localeCompare(a.created_at)
    );

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

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
                                    <PostOptionsModal post={post}/>
                                </div>
                            ): null}
                        </div>

                        <div className="post-mid">
                            <div>
                                <img className="post-img" src={post?.media_url}></img>
                            </div>
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
                </div>
            ))}

        </div>
    )
}

export default Post;
