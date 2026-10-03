import { useState, type ChangeEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '../components/Avatar'
import { readAvatarFile } from '../utils/avatar'
import './Profile.css'

function Profile() {
    const navigate = useNavigate()
    const [username, setUsername] = useState(() => localStorage.getItem('username')||'')
    const [avatar, setAvatar] = useState(() => localStorage.getItem('avatar')||'')

    function handleAvatarChange(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        readAvatarFile(file, setAvatar)
    }

    function handleSave() {
        if (username.trim() === '') {
            alert('Name cannot be empty')
            return
        }
        localStorage.setItem('username', username)
        localStorage.setItem('avatar', avatar)
        alert('Profile saved')
    }

    function handleLogout() {
        localStorage.removeItem('username')
        localStorage.removeItem('avatar')
        navigate('/')
    }

    return (
        <div className="profile-page">
            <Link to="/boards" className="back-link">← Back to boards</Link>
            <h1>Profile</h1>

            <Avatar src={avatar} name={username} size={100} />

            <label className="file-upload-label">
                Change photo
                <input type="file" accept="image/*" onChange={handleAvatarChange} hidden />
            </label>

            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Your name"
            />

            <button onClick={handleSave}>Save</button>
            <button className="logout-button" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Profile