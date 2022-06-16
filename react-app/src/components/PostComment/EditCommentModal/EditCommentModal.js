import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import { PostModal } from "../../../context/PostModal";
import EditComment from "./EditComment";


const EditCommentModal = ({ comment }) => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        if (!showModal) return; // do nothing if modal already closed
        setShowModal(false); // else close modal

    };
    return (
        <>
            <button className="edit-comment" onClick={() => setShowModal(true)}>
                <i class="fa-solid fa-user-pen"></i>
            </button>
            {showModal && (
                <PostModal onClose={() => setShowModal(false)}>
                    <EditComment setShowModal={closeModal} comment={comment} />
                </PostModal>
            )}
        </>
    );
};

export default EditCommentModal;
