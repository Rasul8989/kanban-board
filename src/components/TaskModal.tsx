import { useState } from 'react'
import './TaskModal.css'
import type { Task, Priority } from '../types'

interface TaskModalProps {
    task: Task
    onClose: () => void
    onSave: (updatedTask: Task) => void
    onDelete: (taskId: number) => void
}

function TaskModal(props: TaskModalProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(props.task.title)
    const [description, setDescription] = useState(props.task.description)
    const [priority, setPriority] = useState(props.task.priority)
    const [tagsInput, setTagsInput] = useState(props.task.tags.join(', '))
    const [deadline, setDeadline] = useState(props.task.deadline)
    const [assignee, setAssignee] = useState(props.task.assignee)

    function handleSave() {
        props.onSave({
            ...props.task,
            title,
            description,
            priority,
            tags: tagsInput.split(',').map((t) => t.trim()).filter((t) => t !== ''),
            deadline,
            assignee
        })
        setIsEditing(false)
    }

    function handleDelete() {
        props.onDelete(props.task.id)
    }

    return (
        <div className="modal-overlay" onClick={props.onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {isEditing ? (
                    <>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} />
                        <input value={description} onChange={(e) => setDescription(e.target.value)} />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value as Priority)}
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                        <input value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} />
                        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
                        <input value={assignee} onChange={(e) => setAssignee(e.target.value)} />
                        <button onClick={handleSave}>Save</button>
                    </>
                ) : (
                    <>
                        <h2>{props.task.title}</h2>
                        <p>{props.task.description}</p>
                        <div>Priority: {props.task.priority}</div>
                        <div>Tags: {props.task.tags.join(', ')}</div>
                        <div>Deadline: {props.task.deadline}</div>
                        <div>Assignee: {props.task.assignee}</div>
                        <div>Created: {props.task.createdAt}</div>
                        <button onClick={() => setIsEditing(true)}>Edit</button>
                        <button onClick={handleDelete}>Delete</button>
                    </>
                )}
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    )
}

export default TaskModal