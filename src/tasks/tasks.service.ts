import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Task } from '../models/task.model';

@Injectable()
export class TaskService {
    private readonly FILE_PATH = 'data/tasks.json';

    private tasks: Task[] = [];

    constructor() {
        this.loadTasks();
    }

    private loadTasks(): void {
        try {
            const data = fs.readFileSync(this.FILE_PATH, 'utf-8');
            this.tasks = JSON.parse(data);
        } catch (error) {
            console.error('Error reading tasks file:', error);
        }
    }

    private saveTasks(): void {
        try {
            fs.writeFileSync(this.FILE_PATH, JSON.stringify(this.tasks, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing tasks file:', error);
        }
    }

    create(task: Task): Task {
        task.id = (this.tasks.length + 1).toString();
        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    findAll(): Task[] {
        return this.tasks;
    }

    findById(id: string): Task {
        return this.tasks.find(task => task.id === id);
    }

    update(id: string, updatedTask: Task): Task {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...updatedTask, id };
            this.saveTasks();
            return this.tasks[taskIndex];
        }
        return null;
    }

    delete(id: string): Task {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            const deletedTask = this.tasks.splice(taskIndex, 1);
            this.saveTasks();
            return deletedTask[0];
        }
        return null;
    }
}
