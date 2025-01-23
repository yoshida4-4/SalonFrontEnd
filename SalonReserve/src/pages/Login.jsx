import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        axios.defaults.baseURL = 'http://127.0.0.1:8000'; // LaravelバックエンドのURL
        axios.defaults.withCredentials = true; // クッキーを利用する
        // axios.defaults.xsrfCookieName = 'XSRF-TOKEN'; // LaravelのCSRFトークンのクッキー名
        // axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'; // ヘッダーに設定するトークン名

        try {
            // CSRF Cookie の取得
            await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');

            // ログイン API の呼び出し
            const response = await axios.post('http://127.0.0.1:8000/api/login', {
                email,
                password,
                }, {
                    withCredentials: true,
                    withXSRFToken: true,
                    xsrfCookieName: 'XSRF-TOKEN',
                    xsrfHeaderName: 'X-XSRF-TOKEN'
            });

            console.log('ログイン成功:', response.data);
            navigate("/reserve")
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