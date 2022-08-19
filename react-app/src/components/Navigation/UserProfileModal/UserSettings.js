import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { icon_profile } from "./UerIcons";
import { logout } from "../../../store/session";
import './UserSettings.css';

const UserSettings = ({setShowModal}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user);


    return (
        <div className="nav-modal-main">
            <div
                className="profile-info"
                onClick={() => {
                    history.push(`/users/${user?.id}`);
                    setShowModal(false)
                }}
            >
                {icon_profile}
                <div className="info-title">Profile</div>
            </div>

            <div
                className="profile-info2"
                onClick={() => {

                    dispatch(logout());
                }}
            >
                <div className="info-logout">Log Out</div>
            </div>
        </div>
    );
};

export default UserSettings;
