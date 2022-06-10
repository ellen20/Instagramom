import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadPost } from "../../../store/post";
import { editPost } from "../../../store/post";


const EditPost = ({ setShowModal, post }) => {
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

    const postEdit = () => {
        let errorr = [];

        if (description.length > 400) {
            errorr.push("Caption cannot be over 400 characters.");
        }

        if (errorr.length > 0) {
            return setErrors(errorr);
        }

        const posts = {
            description: description,
        };

        dispatch(editPost(post.id, posts))
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

            <div className="edit-post-main">
                <div className="description">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="new-post-desc"
                        placeholder={post.description}
                        maxLength="400" />
                </div>

                <div className="edit-post-submit" onClick={postEdit}>
                    Submit
                </div>

            </div>
        </>
    );
};

export default EditPost;
