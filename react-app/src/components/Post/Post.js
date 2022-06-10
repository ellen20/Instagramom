import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import "./Post.css";
import { getAllPosts } from "../../store/post";
import { deletePost } from "../../store/post";

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
       console.log(">>>>>>>",id)
       dispatch(deletePost(id))
   }
    return (
        <div className="all-posts">
            {posts?.map(post => (
                <>
                   <img src={post?.media_url}></img>
                   <button className="post-delete" value={post.id} onClick={e => postDelete(e)}>delete</button>
                </>
            ))}

        </div>
    )
}

export default Post;
