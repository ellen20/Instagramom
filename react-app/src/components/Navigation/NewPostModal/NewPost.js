import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPost } from "../../../store/post";
import { newIcon } from "./newIcons";
import "./NewPost.css";
import ReactPlayer from "react-player";

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

        if (description.length < 1) {
            errorr.push("Please write a caption.");
        }

        // if (image === false) {
        //     errorr.push("Please provide an image file.");
        // }
        // else {
            const allowedImg = [".pdf", ".png", ".jpg", "jpeg", ".gif",".mp3", ".wav", ".flac",".mp4", ".mov"]
            const loadedImg = imgUrl.name.slice(-4).toLowerCase();

            if(!allowedImg.includes(loadedImg)){
                errorr.push("Please provide an valid file. (Allowed image type: pdf, png, jpg, jpeg, gif. Allowed video type: mp4, mov)");
            }
        // }

        if (errorr.length > 0) {
            return setErrors(errorr);
        }
// console.log("??????????", url, imgUrl)
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
                                        // accept="video/*"
                                        onChange={(e) => {
                                            setUrl(URL.createObjectURL(e.target.files[0]));
                                            setImgUrl(e.target.files[0]);
                                        }}
                                    />
                                </label>
                            </div>
                        ):(
                            <>
                            {imgUrl.name.slice(-4) === ".mp4" ? (
                                <ReactPlayer
                                className="preview-img"
                                url={url}
                                width='100%'
                                height='100%'
                                onError={() => setImage(false)}
                                onLoad={() => setImage(true)}
                                />
                            ):(
                                <img
                                    className="preview-img"
                                    src={url}
                                    onError={() => setImage(false)}
                                    onLoad={() => setImage(true)}
                                />
                            )}
                            </>
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
                                maxLength="400" />
                        </div>
                        {url.length > 0 ? (
                            <>
                                {imgUrl.name.slice(-4) === ".mp4" ? (
                                    <div
                                    className="remove-image"
                                    onClick={() => {
                                        setUrl("");
                                        setImgUrl("");
                                    }}>
                                    Remove Video
                                </div>
                                ):(
                                <div
                                    className="remove-image"
                                    onClick={() => {
                                        setUrl("");
                                        setImgUrl("");
                                    }}>
                                    Remove Image
                                </div>
                                )}
                            </>
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
