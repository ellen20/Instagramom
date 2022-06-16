import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, editPost } from "../../../store/post";
import "./PostOptions.css";

const PostOptions = ({ post, setShowModal }) => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    const [openDel, setOpenDel] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [description, setDescription] = useState(post.description);
    const [errors, setErrors] = useState([]);

    const openDelModal = () => {
        setOpenDel(true)
    }

    const openEditModal = () => {
        setOpenEdit(true)
    }

    const postEdit = () => {
        let errorr = [];

        if (description.length > 400) {
            errorr.push("Caption cannot be over 400 characters.");
        }

        if (description.length < 1) {
            errorr.push("Please input new caption.");
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

    const postDelete = () => {
        dispatch(deletePost(post.id))
        setShowModal(false)
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="options-modal">
            {!openDel && !openEdit &&(
                <>
                    <div className="close-modal">
                        <img
                            className="close-modal-img"
                            onClick={() => setShowModal(false)}
                            src="https://img.icons8.com/ios-filled/50/ffffff/multiply.png"
                        />
                    </div>

                    <div className="hide-options">
                        <div onClick={openDelModal} className="delete-post">
                            Delete
                        </div>
                        <div className="edit-post" onClick={openEditModal}>
                            Edit caption
                        </div>
                        <div className="cancle-modal" onClick={closeModal}>
                            Cancel
                        </div>
                    </div>
                </>
            )}
            {openDel && (
                <>
                    <div className="close-modal">
                        <img
                            className="close-modal-img"
                            onClick={() => setShowModal(false)}
                            src="https://img.icons8.com/ios-filled/50/ffffff/multiply.png"
                        />
                    </div>
                    <div className="">
                        <h3>Delete post</h3>
                        <p className="confirmdeltext">
                            Are you sure you want to delete this post?
                        </p>
                    </div>
                    <div className="buttons">
                        <div className="post-delete" onClick={postDelete}>
                            Delete
                        </div>
                        <div className="post-delete-cancel" onClick={() => { setOpenDel(false)}}>
                            Cancel
                        </div>
                    </div>
                </>

            )}

            {openEdit && (
                <div className="delete-post-modal">
                   <h3>Edit Caption</h3>
                   <div className='errors'>
                            {errors?.map((error, ind) => (
                                <div className='err-msg' key={ind}>{error}</div>
                            ))}
                    </div>
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
                                className="edit-post-desc"
                                maxLength="400" />
                        </div>

                        <div className="buttons">
                            <div className="edit-post-submit" onClick={postEdit}>
                                Submit
                            </div>
                            <div className="post-delete-cancel" onClick={() => { setOpenEdit(false)}}>
                                Cancel
                            </div>
                        </div>



                    </div>
                </div>

            )}
        </div>
    );
};

export default PostOptions;
