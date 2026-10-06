import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Column from './Column'
import TaskForm from './TaskForm'
import TaskModal from './TaskModal'
import './Board.css'

interface Task {
    id: number
    title: string
    description: string
    priority: 'low' | 'medium' | 'high'
    status: 'todo' | 'in-progress' | 'done'
    tags: string[]
    deadline: string
    assignee: string
    createdAt: string
}

function Board() {
    const { id } = useParams<{ id: string }>()

    const [tasks, setTasks] = useState<Task[]>(() => {
        if (!id) return []
        const saved = localStorage.getItem(`board-tasks-${id}`)
        return saved ? JSON.parse(saved) : []
    })

    function persist(updatedTasks: Task[]) {
        setTasks(updatedTasks)
        if (id) {
            localStorage.setItem(`board-tasks-${id}`, JSON.stringify(updatedTasks))
        }
    }

    const [searchQuery, setSearchQuery] = useState('')
    const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')
    const [assigneeFilter, setAssigneeFilter] = useState('')
    const [tagFilter, setTagFilter] = useState('')
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
        const matchesAssignee = task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())
        const matchesTag = tagFilter === '' || task.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
        return matchesSearch && matchesPriority && matchesAssignee && matchesTag
    })

    function handleAddTask(newTask: Task) {
        persist([...tasks, newTask])
    }

    function handleMoveTask(taskId: number, newStatus: 'todo' | 'in-progress' | 'done') {
        persist(
            tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            )
        )
    }

    function handleSaveTask(updatedTask: Task) {
        persist(
            tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        )
        setSelectedTask(null)
    }

    function handleDeleteTask(taskId: number) {
        persist(tasks.filter((task) => task.id !== taskId))
        setSelectedTask(null)
    }

    return (
        <div className="board">
            <TaskForm onAddTask={handleAddTask} />

            <div className="filters">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search tasks..."
                />
                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value as 'all' | 'low' | 'medium' | 'high')}
                >
                    <option value="all">All priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                <input
                    type="text"
                    value={assigneeFilter}
                    onChange={(e) => setAssigneeFilter(e.target.value)}
                    placeholder="Filter by assignee"
                />
                <input
                    type="text"
                    value={tagFilter}
                    onChange={(e) => setTagFilter(e.target.value)}
                    placeholder="Filter by tag"
                />
            </div>

            <div className="columns">
                <Column
                    title="To Do"
                    status="todo"
                    tasks={filteredTasks}
                    onMoveTask={handleMoveTask}
                    onTaskClick={(task) => setSelectedTask(task)}
                />
                <Column
                    title="In Progress"
                    status="in-progress"
                    tasks={filteredTasks}
                    onMoveTask={handleMoveTask}
                    onTaskClick={(task) => setSelectedTask(task)}
                />
                <Column
                    title="Done"
                    status="done"
                    tasks={filteredTasks}
                    onMoveTask={handleMoveTask}
                    onTaskClick={(task) => setSelectedTask(task)}
                />
            </div>

            {selectedTask && (
                <TaskModal
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    onSave={handleSaveTask}
                    onDelete={handleDeleteTask}
                />
            )}
        </div>
    )
}

export default Board