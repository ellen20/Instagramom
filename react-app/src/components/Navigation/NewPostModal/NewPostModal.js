import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import NewPost from "./NewPost";


const NewPostModal = () => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        if (!showModal) return; // do nothing if modal already closed
        setShowModal(false); // else close modal

    };
    return (
        <>
            <button onClick={() => setShowModal(true)}>New Post</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewPost setShowModal={closeModal}/>
                </Modal>
            )}
        </>
    );
};

export default NewPostModal;
