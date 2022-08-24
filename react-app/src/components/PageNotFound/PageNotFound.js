import React from 'react';
import './PageNotFound.css';
import error from '../images/error.jpg';
import { NavLink } from 'react-router-dom';
import page from './page.jpg';

const PageNotFound = () => {
    return (
        <div className='error-page'>
            <div className='error-box'>
                <h2 className='error-box-header'>Sorry, this page isn't available.</h2>
                <p className='error-box-text'>The link you followed may be broken, or the page may have been removed.</p>
                <NavLink className='error-nav' to='/'>
                    <button className='error-button'>Go back to Instagram.</button>
                </NavLink>
                <div className='page-not-found'>
                    <img className='page-not-found-img' src={page} />
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
