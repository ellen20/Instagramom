import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import "./User.css";
import ReactPlayer from "react-player";

function User() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const allPosts = useSelector((state) => state.posts);
    const posts = Object.values(allPosts).filter(post => post?.user_id == userId)

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <>
            <div className='prof-main'>
                <div className='prof-top'>
                    <div className='prof-left'>
                        <img className="prof-img" src={user?.image_url} />
                    </div>

                    <div className="prof-right">
                        <div className="prof-name">
                            <div className="prof-name" >{user?.username}</div>
                        </div>

                        <div className='prof-count'>
                            {posts?.length} posts
                        {/* <span className="p-ct-bold">{posts[+userId]?.posts.length}</span>{" "}
                        {posts[+userId]?.posts.length !== 1 ? "posts" : "post"} */}
                        </div>

                        <div className='prof-fullname'>
                            {user?.fullname}
                        </div>

                        <div className='prof-desc'>
                            {user?.description}
                        </div>
                    </div>
                </div>

                <div className='prof-bot'>
                    {posts?.map((post) => (
                        <div className=''
                        onClick={() => history.push(`/posts/${post?.id}`)}
                        >
                            {post?.media_url.slice(-4) === ".mp4" ? (
                                <ReactPlayer
                                    className="p-img"
                                    width='15em'
                                    height='15em'
                                    objectFit='cover'
                                    url={post?.media_url} />
                            ):(
                                <img className='p-img' src={post?.media_url} />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
export default User;
