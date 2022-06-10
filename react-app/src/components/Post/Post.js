import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";
import { getAllPosts } from "../../store/post";
import { deletePost, editPost } from "../../store/post";
import EditPostModal from "./EditPostModal/EditPostModal";

const Post = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const user_id = useSelector(state => state.session?.user?.id)
    const posts = useSelector(state => Object.values(state?.posts))

    useEffect(() => {
        dispatch(getAllPosts())

}, [dispatch])

   const postDelete = (e) => {
       let id = e.currentTarget.value;
       dispatch(deletePost(id))
   }

    // const postEdit = (e) => {
    //     let id = e.currentTarget.value;

    //     dispatch(editPost(id, post))
    // }

    return (
        <div className="all-posts">
            {posts?.map(post => (
                <div className="post-main">
                    <div className="post-top">
                        <div className="post-user">
                            user
                        </div>
                        <div className="post-top-right">
                            {/* <ChangePostModal post={post} /> */}
                            <button className="post-delete" value={post.id} onClick={e => postDelete(e)}>delete</button>
                            <EditPostModal post={post} />
                            {/* <button className="post-edit" value={post.id} onClick={e => postEdit(e)}>edit</button> */}
                        </div>
                    </div>

                    <div className="post-mid">
                        <div className="post-img">
                        <img src={post?.media_url}></img>
                        </div>
                        <div className="post-description">
                            {post?.description}
                        </div>
                    </div>

                    <div className="post-bottom">
                        following coments
                    </div>
                </div>
            ))}

        </div>
    )
}

export default Post;
