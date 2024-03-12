import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from '../models/user.model';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService) { }

    @Post()
    createUser(@Body() user: User): User {
        return this.userService.createUser(user);
    }

    @Get()
    findAllUsers(): User[] {
        return this.userService.findAllUsers();
    }

    @Get(':id')
    findUserById(@Param('id') id: string): User {
        return this.userService.findUserById(id);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() updatedUser: User): User {
        return this.userService.updateUser(id, updatedUser);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string): User {
        return this.userService.deleteUser(id);
    }
}