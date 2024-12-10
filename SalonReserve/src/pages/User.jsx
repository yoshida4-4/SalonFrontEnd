import React, { useEffect, useState } from 'react';
import axios from '../api/axios';

 export const User = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/user');
                setUser(response.data);
            } catch (err) {
                console.error('ユーザー情報の取得に失敗しました。', err);
            }
        };

        fetchUser();
    }, []);

    if (!user) {
        return <p>ユーザー情報を取得中...</p>;
    }

    return (
        <div>
            <h1>ようこそ, {user.name}</h1>
            <p>Email: {user.email}</p>
        </div>
    );
};