import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const PostModalContext = React.createContext();

export function PostModalProvider({ children }) {
    const postModalRef = useRef();
    const [value, setValue] = useState();

    useEffect(() => {
        setValue(postModalRef.current);
    }, [])

    return (
        <>
            <PostModalContext.Provider value={value}>
                {children}
            </PostModalContext.Provider>
            <div ref={postModalRef} />
        </>
    );
}

export function PostModal({ onClose, children}) {
    const postModalNode = useContext(PostModalContext);
    if (!postModalNode) return null;


    return ReactDOM.createPortal(
        <div id="post-modal">
            <div id="post-modal-background" onClick={onClose} />
            <div id="post-modal-content" >
                {children}
            </div>
        </div>,
        postModalNode
    );
}
