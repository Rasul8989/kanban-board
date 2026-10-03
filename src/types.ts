export type Priority = 'low' | 'medium' | 'high'
export type TaskStatus = 'todo' | 'in-progress' | 'done'

export interface Task {
    id: number
    title: string
    description: string
    priority: Priority
    status: TaskStatus
    tags: string[]
    deadline: string
    assignee: string
    createdAt: string
}

export interface BoardItem {
    id: number
    name: string
}