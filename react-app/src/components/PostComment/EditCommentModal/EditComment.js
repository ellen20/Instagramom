import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editComment } from '../../../store/comment';
import EditCommentModal from "./EditCommentModal";


const EditComment = ({ setShowModal, comment }) => {
    const dispatch = useDispatch();
    const [url, setUrl] = useState("");
    const [imgUrl, setImgUrl] = useState("");
    const [description, setDescription] = useState(comment.description);
    const [errors, setErrors] = useState([]);
    const user = useSelector((state) => state.session.user);
    const [image, setImage] = useState(true);

    useEffect(() => {
        setErrors([]);
    }, [url]);

    const commentEdit = (e) => {

        let errorr = [];

        if (description.length > 400) {
            errorr.push("Comment cannot be over 400 characters.");
        }

        if (description.length < 1) {
            errorr.push("Please input the comment.");
        }

        if (errorr.length > 0) {
            return setErrors(errorr);
        }

        const comment_edit = {
            description: description,
        };

        dispatch(editComment(comment.id, comment_edit))
        .then(setShowModal(false))
    }

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
                <h3>Edit Comment</h3>
                <div className='errors'>
                {errors?.map((error, ind) => (
                    <div className='err-msg' key={ind}>{error}</div>
                ))}
                </div>
                <div className="edit-description">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="edit-post-desc"
                        placeholder={comment.description}
                        maxLength="400" />
                </div>
                <div className="buttons">
                    <div className="edit-post-submit"
                            onClick={commentEdit}
                            disabled={description.length < 1}>
                            Submit
                    </div>

                    <div className="cancel"
                            onClick={() => setShowModal(false)}
                            disabled={description.length < 1}>
                            Cancel
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditComment;
