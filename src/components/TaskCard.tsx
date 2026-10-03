import type { DragEvent } from 'react'
import type { Priority, TaskStatus } from '../types'

interface TaskCardProps {
    id: number
    title: string
    description: string
    priority: Priority
    status: TaskStatus
    tags: string[]
    deadline: string
    assignee: string
    createdAt: string
    onClick: () => void
}

function TaskCard(props: TaskCardProps) {
    function handleDragStart(e: DragEvent) {
        e.dataTransfer.setData('taskId', String(props.id))
    }

    return (
        <div
            className="task-card"
            data-priority={props.priority}
            draggable="true"
            onDragStart={handleDragStart}
            onClick={props.onClick}
        >
            <h3>{props.title}</h3>
            <p>{props.description}</p>
            <span>Priority: {props.priority}</span>
            <div>Tags: {props.tags ? props.tags.join(', ') : ''}</div>
            <div>Deadline: {props.deadline}</div>
            <div>Assignee: {props.assignee}</div>
            <div>Created: {props.createdAt}</div>
        </div>
    )
}

export default TaskCard