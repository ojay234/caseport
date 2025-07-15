import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, Query, ForbiddenException, Put, } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RequestWithUser } from 'src/types/request-with-user.type';





@Controller('users')

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
    findAll(@Req() request: RequestWithUser,  ) {
    const userId = request.user?.id;
    return this.usersService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    const userId = request.user?.id;
    if (userId !== id) {
      throw new ForbiddenException('You are not allowed to access this resource.');
    }
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, request: RequestWithUser) {
    return this.usersService.update(id, updateUserDto, request?.user);
  }
  

@Patch(':id/change-role')
changeRole(
  @Req() request: RequestWithUser,
  @Param('id') id: string,
  @Body() body: { role: string },
) {
  const requestingUser = request.user;
  return this.usersService.changeRole(requestingUser, id, body.role);
}

@Delete(':id')
secureDelete(
  @Req() request: RequestWithUser,
  @Param('id') id: string
) {
  const requestingUser = request.user;
  return this.usersService.deleteUser(requestingUser, id);
}

}