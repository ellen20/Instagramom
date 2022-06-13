import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import NewPost from "./NewPost";
import { newPostIcon, postIconActive,} from "../NavIcons";

const NewPostModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [active, setActive] = useState(false);

    const closeModal = () => {
        if (!showModal) return; // do nothing if modal already closed
        setShowModal(false); // else close modal

    };

    return (
        <>
            {showModal ? (
            <div className="post-icon" onClick={() => setShowModal(true)}>
                 {postIconActive}
            </div>
            ) : (
            <div className="post-icon" onClick={() => setShowModal(true)}>
                {newPostIcon}
            </div>
            )}

            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewPost setShowModal={closeModal}/>
                </Modal>
            )}
        </>
    );
};

export default NewPostModal;
