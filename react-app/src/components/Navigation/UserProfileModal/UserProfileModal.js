import React, { useState } from "react";
import '../Navigation.css';
import { NavModal } from "../../../context/NavModal";
import UserSettings from "./UserSettings";



const UserProfileModal = ({ user }) => {
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => {
        if (!showModal) return; // do nothing if modal already closed
        setShowModal(false); // else close modal
    }

    return (
        <>
            <div>
                <img
                    className="nav-prof"
                    onClick={() => setShowModal(true)}
                    src={user.image_url}
                    style={{ visibility: "visible" }}
                />
            </div>
            {showModal && (
                <NavModal onClose={() => setShowModal(false)}>
                    <UserSettings setShowModal={closeModal} />
                </NavModal>
            )}
        </>
    );
};

export default UserProfileModal;
