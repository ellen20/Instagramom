import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, editPost } from "../../../store/post";

const PostOptions = ({ post, setShowModal }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const emoji = useRef(null);
    const [open, setOpen] = useState(0);
    const user = useSelector((state) => state.session.user);
    // const [input, setInput] = useState(post.post.description);
    // const [showModal, setShowModal] = useState(false);
    const [openDel, setOpenDel] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [description, setDescription] = useState("");
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
    }

    const closeModal = () => {
        setShowModal(false)
    }

    return (
        <div className="options-modal">
            {!openDel & !openEdit &&(

                <div className="hide-options">
                    <div onClick={openDelModal} className="delete-post">
                        Delete
                    </div>
                    <div className="edit-post" onClick={openEditModal}>
                        Edit caption
                    </div>
                    <div className="goto-post" onClick={closeModal}>
                        Cancel
                    </div>
                </div>
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
                    <div className="post-delete" onClick={postDelete}>
                        Delete
                    </div>
                    <div className="post-delete-cancel" onClick={closeModal}>
                        Cancel
                    </div>
                </>

            )}

            {openEdit && (
                <>
                   <h3>Edit Caption</h3>
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
                        <div className="post-delete-cancel" onClick={closeModal}>
                            Cancel
                        </div>

                    </div>
                </>

            )}
        </div>
    );
};

export default PostOptions;
