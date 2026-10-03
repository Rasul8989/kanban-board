import type { DragEvent } from 'react'
import TaskCard from './TaskCard'
import type { Task, TaskStatus } from '../types'

interface ColumnProps {
    title: string
    status: TaskStatus
    tasks: Task[]
    onMoveTask: (taskId: number, newStatus: TaskStatus) => void
    onTaskClick: (task: Task) => void
}

function Column(props: ColumnProps) {
    const columnTasks = props.tasks.filter((task) => task.status === props.status)

    function handleDragOver(e: DragEvent) {
        e.preventDefault()
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault()
        const taskId = Number(e.dataTransfer.getData('taskId'))
        props.onMoveTask(taskId, props.status)
    }

    return (
        <div className="column" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h2>{props.title}</h2>
            {columnTasks.map((task) => (
                <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    description={task.description}
                    priority={task.priority}
                    status={task.status}
                    tags={task.tags}
                    deadline={task.deadline}
                    assignee={task.assignee}
                    createdAt={task.createdAt}
                    onClick={() => props.onTaskClick(task)}
                />
            ))}
        </div>
    )
}

export default Column