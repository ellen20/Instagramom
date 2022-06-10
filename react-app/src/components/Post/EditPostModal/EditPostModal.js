import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditPost from "./EditPost";


const EditPostModal = ({post}) => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        if (!showModal) return; // do nothing if modal already closed
        setShowModal(false); // else close modal

    };
    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Post</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditPost setShowModal={closeModal} post={post} />
                </Modal>
            )}
        </>
    );
};

export default EditPostModal;
