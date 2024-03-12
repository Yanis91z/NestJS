import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TaskService } from './tasks.service';
import { Task } from '../models/task.model';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Task> {
        return this.taskService.findById(id);
    }

    @Post()
    async create(@Body() task: Task): Promise<Task> {
        return this.taskService.create(task);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updatedTask: Task): Promise<Task> {
        return this.taskService.update(id, updatedTask);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Task> {
        return this.taskService.delete(id);
    }
}
