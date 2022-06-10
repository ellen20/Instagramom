import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import { useModal } from "../../../context/UseModal";
import NewPost from "./NewPost";
import { newPostIcon, postIconActive } from "../../Home/icons";


const PostModal = () => {
    // const { num, setNum } = useModal();
    const [showModal, setShowModal] = useState(false);
    return (
        <>

            <button onClick={() => setShowModal(true)}>New Post</button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <NewPost />
                </Modal>
            )}
        </>
    );
};

export default PostModal;
