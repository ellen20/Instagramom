import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPost } from "../../../store/post";
import { newIcon } from "./newIcons";
import "./NewPost.css";

const NewPost = ({setShowModal}) => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const [image, setImage] = useState(true);

    useEffect(() => {
        setErrors([]);
    }, [url]);

    const createNewPost = () => {
        let errorr = [];

        if (url.length === 0) {
            errorr.push("Please provide an image.");
            return setErrors(errorr);
        }

        if (description.length > 400) {
            errorr.push("Caption cannot be over 400 characters.");
        }

        if (image === false) {
            errorr.push("Please provide an image file.");
        }
        else {
            const allowedImg = ["pdf", "png", "jpg", "jpeg", "gif"]
            const loadedImg = imgUrl.name.slice(-3);

            if(!allowedImg.includes(loadedImg)){
                errorr.push("Please provide an valid image file. (Allowed image type: pdf, png, jpg, jpeg, gif)");
            }
        }

        if (errorr.length > 0) {
            return setErrors(errorr);
        }

        const post = {
            file: imgUrl,
            description: description,
        };
        dispatch(uploadPost(post))
        setShowModal(false)
    };


    return (
        <>
            <div className="close-modal">
                <img
                    className="close-modal-img"
                    onClick={() => setShowModal(false)}
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

                    <div className="post-bottom-right">
                        <div className="new-post-user">
                            <img className="new-user-img" src={user.image_url} />
                            <p className="new-username">{user.username}</p>
                        </div>
                        <div className="description">
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="new-post-desc"
                                placeholder="Write a caption..."
                                maxLength="300" />
                        </div>
                        {url.length > 0 ? (
                            <div
                                className="remove-image"
                                onClick={() => {
                                    setUrl("");
                                    setImgUrl("");
                                }}>
                                Remove Image
                            </div>
                        ) : null}
                        <div className="post-error">
                            {errors &&
                            errors.map((err) => <div className="post-error">{err}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewPost;
