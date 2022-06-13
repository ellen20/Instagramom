import React, { useState } from "react";
import '../Navigation.css';
import { NavModal } from "../../../context/NavModal";
import UserSettings from "./UserSettings";



const UserProfileModal = ({ user}) => {
    const [showModal, setShowModal] = useState(false);

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
                    <UserSettings />
                </NavModal>
            )}
        </>
    );
};

export default UserProfileModal;
