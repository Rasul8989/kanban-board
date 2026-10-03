import { useState, type FormEvent } from 'react'
import type { Task, Priority } from '../types'

interface TaskFormProps {
    onAddTask: (task: Task) => void
}

function TaskForm(props: TaskFormProps) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [priority, setPriority] = useState<Priority>('medium')
    const [tagsInput, setTagsInput] = useState('')
    const [deadline, setDeadline] = useState('')
    const [assignee, setAssignee] = useState('')

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        const newTask: Task = {
            id: Date.now(),
            title: title,
            description: description,
            priority: priority,
            status: 'todo',
            tags: tagsInput.split(',').map((tag) => tag.trim()).filter((tag) => tag !== ''),
            deadline: deadline,
            assignee: assignee,
            createdAt: new Date().toISOString().slice(0, 10)
        }

        props.onAddTask(newTask)

        setTitle('')
        setDescription('')
        setPriority('medium')
        setTagsInput('')
        setDeadline('')
        setAssignee('')
    }

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
            <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="Tags (comma separated)"
            />
            <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
            />
            <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Assignee"
            />
            <button type="submit">Add task</button>
        </form>
    )
}

export default TaskForm