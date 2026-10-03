import './Avatar.css'

interface AvatarProps {
    src: string
    name: string
    size: number
}

function Avatar({ src, name, size }: AvatarProps) {
    const style = { width: size, height: size, fontSize: size / 2.5 }

    if (src) {
        return <img className="avatar" src={src} alt={name} style={style} />
    }

    const letter = name.trim() !== '' ? name.trim()[0].toUpperCase() : '?'
    return <div className="avatar avatar-letter" style={style}>{letter}</div>
}

export default Avatar