import { Link } from 'react-router-dom'
import Avatar from './Avatar'
import './Header.css'

interface HeaderProps {
    title: string
    showBack?: boolean
}

function Header({ title, showBack }: HeaderProps) {
    const username = localStorage.getItem('username')|| ''
    const avatar = localStorage.getItem('avatar')|| ''

    return (
        <header className="header">
            <div className="header-left">
                {showBack && <Link to="/boards" className="header-link">← Boards</Link>}
            </div>

            <h1 className="header-title">{title}</h1>

            <div className="header-right">
                <Link to="/profile" className="header-link header-profile" title="Profile">
                    <span>{username}</span>
                    <Avatar src={avatar} name={username} size={40} />
                </Link>
            </div>
        </header>
    )
}

export default Header