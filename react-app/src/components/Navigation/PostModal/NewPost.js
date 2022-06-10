import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createPost, findFollowingPosts, findPosts } from "../../../store/post";
import { newIcon } from "./newIcons";
import { updateUser } from "../../../store/user";
import "./NewPost.css";
import { uploadPost } from "../../../store/post";
import { useModal } from "../../../context/UseModal";

const NewPost = () => {
    const dispatch = useDispatch();
    const emoji = useRef(null);
    const { num, setNum } = useModal();
    const [url, setUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [desc, setDesc] = useState("");
    const [errors, setErrors] = useState([]);
    const path = window.location.pathname;
    const user = useSelector((state) => state.session.user);
    const [image, setImage] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        setErrors([]);
    }, [url]);

    const createNewPost = () => {
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
            description: "test",
        };

        dispatch(uploadPost(post))

    };

    return (
        <>
            <div className="close-modal">
                <img
                    className="close-modal-img"
                    onClick={() => setNum(0)}
                    src="https://img.icons8.com/ios-filled/50/ffffff/multiply.png"
                />
            </div>

            <div className="new-post-main">

                <div className="new-post-top">
                    <p className="new-title">Create new post</p>
                    <div className="new-submit" onClick={createNewPost}>
                        Share
                    </div>
                </div>

                <div className="new-post-bottom">
                    <div className="post-bottom-left">
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
            </div>
        </>
    );
};

export default NewPost;
