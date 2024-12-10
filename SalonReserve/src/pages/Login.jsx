import React, { useState } from 'react';
import axios from '../api/axios.jsx';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // CSRF Cookie の取得
            await axios.get('/sanctum/csrf-cookie');

            // ログイン API の呼び出し
            const response = await axios.post('/login', {
                email,
                password,
            });

            console.log('ログイン成功:', response.data);
        } catch (err) {
            setError('ログインに失敗しました。');
            console.error(err);
        }
    };

    return (
        <div>
            <h1>ログイン</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
};