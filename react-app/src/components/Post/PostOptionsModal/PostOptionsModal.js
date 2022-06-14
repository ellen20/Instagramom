import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import PostOptions from "./PostOptions";

const PostOptionsModal = ({ post }) => {
      const [showModal, setShowModal] = useState(false);

    return (
        <>
            <img
                className="post-options2"
                onClick={() => setShowModal(true)}
                src="https://img.icons8.com/material-two-tone/24/000000/more.png"
            />
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    {/* <PostOptions post={post} /> */}
                </Modal>
            )}
        </>
    );
};

export default PostOptionsModal;
