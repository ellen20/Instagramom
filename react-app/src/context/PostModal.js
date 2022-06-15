import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './PostModal.css';

const NavModalContext = React.createContext();

export function PostModalProvider({ children }) {
    const navModalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(navModalRef.current);
    }, [])

    return (
        <>
            <NavModalContext.Provider value={value}>
                {children}
            </NavModalContext.Provider>
            <div ref={navModalRef} />
        </>
    );
}

export function PostModal({ onClose, children }) {
    const navModalNode = useContext(NavModalContext);
    if (!navModalNode) return null;


    return ReactDOM.createPortal(
        <div id="nav-modal">
            <div id="nav-modal-background" onClick={onClose} />
            <div id="nav-modal-content" >
                {children}
            </div>
        </div>,
        navModalNode
    );
}
