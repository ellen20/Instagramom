import React, { useState } from "react";
import { NavModal } from "../../../context/NavModal";
import { Modal } from "../../../context/Modal";
import { PostModal } from "../../../context/PostModal";
import PostOptions from "./PostOptions";

const PostOptionsModal = ({ post }) => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        if (!showModal) return; // do nothing if modal already closed
        setShowModal(false); // else close modal

    };
    return (
        <>
            <img
                className="post-options"
                onClick={() => setShowModal(true)}
                src="https://img.icons8.com/material-two-tone/24/000000/more.png"
            />
            {showModal && (
                <PostModal onClose={() => setShowModal(false)}>
                    <PostOptions post={post} setShowModal={closeModal} />
                </PostModal>
            )}
        </>
    );
};

export default PostOptionsModal;
