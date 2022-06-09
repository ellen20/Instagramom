import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import PostModal from './PostModal/PostModal';
import User from '../User/User';
import NewPost from './PostModal/NewPost';
import "./Navigation.css";


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
                <div>
                    <h3>LOGO</h3>
                </div>
                <div className="search-container" >
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="search-bar"
                        placeholder="Search"
                    />

                </div>

                <div className="nav-right">
                    <h3>Icons</h3>
                    <PostModal />
                </div>

                <div>
                    <User />
                </div>

            </div>
        </div>
    );
};

export default Navigation;
