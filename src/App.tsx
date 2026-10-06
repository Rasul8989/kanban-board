import { Routes, Route, useParams } from 'react-router-dom'
import Login from './pages/Login'
import BoardsList from './pages/BoardsList'
import Profile from './pages/Profile'
import Board from './components/Board'
import ThemeToggle from './components/ThemeToggle'

function BoardRoute() {
    const { id } = useParams<{ id: string }>()
    return <Board key={id} />
}

function App() {
    return (
        <>
            <ThemeToggle />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/boards" element={<BoardsList />} />
                <Route path="/boards/:id" element={<BoardRoute />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </>
    )
}

export default App