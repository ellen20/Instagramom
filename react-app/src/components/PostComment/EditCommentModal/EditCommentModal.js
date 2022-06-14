import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditComment from "./EditComment";


const EditCommentModal = ({ comment }) => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        if (!showModal) return; // do nothing if modal already closed
        setShowModal(false); // else close modal

    };
    return (
        <>
            <button onClick={() => setShowModal(true)}>Edit Comment</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <EditComment setShowModal={closeModal} comment={comment} />
                </Modal>
            )}
        </>
    );
};

export default EditCommentModal;
