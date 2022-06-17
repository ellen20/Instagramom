import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NewPostModal from './NewPostModal/NewPostModal';
import User from '../User/User';
import "./Navigation.css";
import UserProfileModal from "./UserProfileModal/UserProfileModal";
import { homeActive, homeIcon } from "./NavIcons";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const path = window.location.pathname;
    const user = useSelector((state) => state.session?.user);
    const history = useHistory();
    const results = useSelector((state) => state.search?.users);

    return (
        <div className="nav-main">
            <div className="nav-mid">
                <div className="nav-logo">
                    <img
                    className="nav-logo"
                    onClick={() => history.push("/")}
                    src="https://fontmeme.com/permalink/220617/310e477cf85c7466a813f402a3e3fe0c.png" alt="generate-text-with-any-font" border="0"
                    ></img>
                </div>
                {/* <div className="search-container" >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="search-bar"
                        placeholder="Search"
                    />

                </div> */}

                <div className="nav-home">
                    {path === '/' ? (
                        <div onClick={() => history.push("/")}>
                            { homeActive }
                        </div>
                    ) : (
                        <div onClick={() => history.push("/")}>
                            {homeIcon}
                        </div>
                    )}
                </div>

                <div className="nav-new-post">
                    <NewPostModal />
                </div>

                <div>
                    <UserProfileModal user={user} />
                </div>

            </div>
        </div>
    );
};

export default Navigation;
