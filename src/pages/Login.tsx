import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { readAvatarFile } from '../utils/avatar'
import './Login.css'

function Login() {
    const [username, setUsername] = useState('')
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()

    function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        readAvatarFile(file, setAvatar)
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (username.trim() === '') {
            alert('Enter your name')
            return
        }
        localStorage.setItem('username', username)
        localStorage.setItem('avatar', avatar)
        navigate('/boards')
    }

    return (
        <div className="login-page">
            <h1>Task Manager</h1>

            <form onSubmit={handleSubmit} className="login-form">
                <Avatar src={avatar} name={username} size={100} />

                <label className="file-upload-label">
                    Upload photo
                    <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
                </label>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Your name"
                />

                <button type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login