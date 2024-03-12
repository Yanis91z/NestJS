import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../models/user.model';
import * as fs from 'fs';

@Injectable()
export class UserService {
    private readonly FILE_PATH = 'data/users.json';
    private users: User[] = [];

    constructor() {
        this.loadUsers();
    }

    private loadUsers(): void {
        try {
            const data = fs.readFileSync(this.FILE_PATH, 'utf-8');
            this.users = JSON.parse(data);
        } catch (error) {
            console.error('Error reading users file:', error);
        }
    }

    private saveUsers(): void {
        try {
            fs.writeFileSync(this.FILE_PATH, JSON.stringify(this.users, null, 2), 'utf-8');
        } catch (error) {
            console.error('Error writing users file:', error);
        }
    }

    createUser(user: User): User {
        user.id = (this.users.length + 1).toString();
        this.users.push(user);
        this.saveUsers();
        return user;
    }

    findAllUsers(): User[] {
        return this.users;
    }

    findUserById(id: string): User {
        const user = this.users.find(u => u.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        return user;
    }

    updateUser(id: string, updatedUser: User): User {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        this.users[index] = { ...this.users[index], ...updatedUser };
        this.saveUsers();
        return this.users[index];
    }

    deleteUser(id: string): User {
        const index = this.users.findIndex(u => u.id === id);
        if (index === -1) {
            throw new NotFoundException(`User with ID '${id}' not found`);
        }
        const deletedUser = this.users.splice(index, 1)[0];
        this.saveUsers();
        return deletedUser;
    }
}