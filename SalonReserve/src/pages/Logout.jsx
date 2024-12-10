import React from 'react';
import axios from '../api/axios';

export const Logout = () => {
    const handleLogout = async () => {
        try {
            await axios.post('/logout');
            console.log('ログアウト成功');
        } catch (err) {
            console.error('ログアウトに失敗しました。', err);
        }
    };

    return <button onClick={handleLogout}>ログアウト</button>;
};