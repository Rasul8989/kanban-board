import './BoardsList.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import type { BoardItem } from '../types'

function BoardsList() {
    const [boards, setBoards] = useState<BoardItem[]>(() => {
        const saved = localStorage.getItem('boards')
        return saved ? JSON.parse(saved) : []
    })

    const [newBoardName, setNewBoardName] = useState('')

    useEffect(() => {
        localStorage.setItem('boards', JSON.stringify(boards))
    }, [boards])

    function handleAddBoard() {
        if (newBoardName.trim() === '') return
        const newBoard: BoardItem = { id: Date.now(), name: newBoardName }
        setBoards([...boards, newBoard])
        setNewBoardName('')
    }

    function handleRename(id: number) {
        const newName = prompt('New board name:')
        if (!newName || newName.trim() === '') return
        setBoards(boards.map((b) => (b.id === id ? { ...b, name: newName } : b)))
    }

    function handleDelete(id: number) {
        setBoards(boards.filter((b) => b.id !== id))
        localStorage.removeItem(`board-tasks-${id}`)
    }

    return (
        <>
            <Header title="My Boards" />

            <div className="boards-list">
                <div className="add-board">
                    <input
                        type="text"
                        value={newBoardName}
                        onChange={(e) => setNewBoardName(e.target.value)}
                        placeholder="New board name"
                    />
                    <button onClick={handleAddBoard}>Add board</button>
                </div>

                {boards.map((board) => (
                    <div key={board.id} className="board-item">
                        <Link to={`/boards/${board.id}`}>{board.name}</Link>
                        <button onClick={() => handleRename(board.id)}>Rename</button>
                        <button onClick={() => handleDelete(board.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}

export default BoardsList