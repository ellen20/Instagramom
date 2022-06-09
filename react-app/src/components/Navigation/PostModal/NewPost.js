import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, findFollowingPosts, findPosts } from "../../../store/post";
import { newIcon } from "./newIcons";
import { updateUser } from "../../../store/user";
import "./NewPost.css";

const NewPost = () => {
    const dispatch = useDispatch();
    const emoji = useRef(null);
    // const { num, setNum } = useModal();
    const [url, setUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [errors, setErrors] = useState([]);
    const path = window.location.pathname;
    const user = useSelector((state) => state.session.user);
    const [image, setImage] = useState(true);

    useEffect(() => {
        setErrors([]);
    }, [url]);

    const submit = () => {
        let err = [];

        if (url.length < 1) {
            err.push("Please provide an image.");
            return setErrors(err);
        }

        if (desc.length > 400) {
            err.push("Caption cannot be over 400 characters.");
        }

        if (image === false) {
            err.push("Please provide an image file.");
        }

        if (err.length > 0) {
            return setErrors(err);
        }

        const post = {
            file: imgUrl,
            description: desc,
        };

        dispatch(createPost(post))
            .then(() => dispatch(findFollowingPosts()))
            .then(() => {
                if (path === `/users/${user?.id}`) {
                    dispatch(findPosts(user?.id));
                    dispatch(updateUser(user?.id));
                }
            });

    };

    return (
        <>

            <div className="new-post-main">

                <div className="new-post-top">
                    <p className="new-title">Create new post</p>
                    <div className="new-submit" onClick={submit}>
                        Share
                    </div>
                </div>

                <div className="new-post-bottom">
                    <div className="post-buttom-left">
                        {url === "" ? (
                            <div className="new-post-preview">
                                {newIcon}
                                <div className="new-post-photo">Upload photos here</div>
                                <label className="new-p-upload" for="new-pic">
                                    Select from computer
                                    <input
                                        id="new-pic"
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setUrl(URL.createObjectURL(e.target.files[0]));
                                            setImgUrl(e.target.files[0]);
                                        }}
                                    />
                                </label>
                            </div>
                        ):(
                            <img
                                className="preview-img"
                                src={url}
                                onError={() => setImage(false)}
                                onLoad={() => setImage(true)}
                            />
                        )}
                    </div>
                    {url.length > 0 ? (
                        <div
                            className="post-url"
                            onClick={() => {
                                setUrl("");
                                setImgUrl("");
                            }}
                        >
                            Remove Image
                        </div>
                    ) : null}
                    {errors &&
                        errors.map((err) => <div className="post-error">{err}</div>)}
                </div>
                {/* {errors &&
                    errors.map((err) => <div className="post-error">{err}</div>)} */}
            </div>
        </>
    );
};

export default NewPost;
