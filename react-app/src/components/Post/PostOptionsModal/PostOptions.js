import { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";

const PostOptions = ({ post }) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const emoji = useRef(null);
    const [open, setOpen] = useState(0);
    const user = useSelector((state) => state.session.user);
    const [input, setInput] = useState(post.post.description);
    const [showModal, setShowModal] = useState(false);


    const deletePost = () => {

    }
    const editPost = () => {

    };


    return (
        <div className="options-modal">
            <div className="hide-options">
                <div onClick={deletePost} className="delete-post">
                    Delete post
                </div>
                <div className="edit-post" onClick={editPost}>
                    Edit caption
                </div>
                <div className="goto-post" onClick={() => setShowModal(false)}>
                    Cancel
                </div>
            </div>
        </div>
    );
};

export default PostOptions;
