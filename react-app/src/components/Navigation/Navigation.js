import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import NewPostModal from './NewPostModal/NewPostModal';
import { searchUsers } from "../../store/search";
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

    useEffect(() => {
        if (input?.length > 0) {
        dispatch(searchUsers(input));
        }
    }, [input]);

    const show = () => {
        document.querySelector(".search-results").classList.remove("hidden");
    };

    const hide = (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
            document.querySelector(".search-results").classList.add("hidden");
        }
    };

    const reset = () => {
        document.querySelector(".search-results").classList.add("hidden");
        setInput("");
    };

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
                <div className="search-container" onBlur={(e) => hide(e)}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="search-bar"
                        placeholder="Search..."
                        onFocus={() => show()}
                    />
                    <div className="search-results hidden">
                        {results?.length > 0 && input.length > 0 ? (
                        results.map((res) => (
                            <NavLink
                            className="search-card"
                            onClick={reset}
                            to={`/users/${res.id}`}
                            >
                            <img className="search-prof" src={res.image_url} />
                            <div className="search-names">
                                <div className="search-username">{res.username}</div>
                                <div className="search-name">{res.fullname}</div>
                            </div>
                            </NavLink>
                            ))
                        ) : (
                            <div className="search-none">No results.</div>
                        )}
                    </div>
                </div>

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
