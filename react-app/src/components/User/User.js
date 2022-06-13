import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';

function User() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <h3>User Profile</h3>
            <ul>
                <li>
                    {user.image_url}
                </li>
                <li>
                     {user.username}
                </li>
                <li>
                    {user.email}
                </li>
            </ul>
        </div>
    );
}
export default User;
