import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173',
  },
})
export class UsersGateway {
  constructor(private readonly usersService: UsersService) {}
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createUser')
  create(@MessageBody() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @SubscribeMessage('findAllUsers')
  async findAll() {
    return this.usersService.findAll();
  }

  @SubscribeMessage('findOneUser')
  findOne(@MessageBody() id: number) {
    return this.usersService.findOne(id);
  }

  @SubscribeMessage('updateUser')
  update(@MessageBody() updateUserDto: UpdateUserDto) {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }

  @SubscribeMessage('removeUser')
  remove(@MessageBody() id: number) {
    return this.usersService.remove(id);
  }

  @SubscribeMessage('findByEmail')
  findByEmail(@MessageBody() email: string) {
    return this.usersService.findByEmail(email);
  }

  @SubscribeMessage('loginUser')
  handleLogin(@MessageBody() userInfo: { email: string; password: string }) {
    return this.usersService.handleLogin(userInfo);
  }

  @SubscribeMessage('addActiveUser')
  addActiveUser(@MessageBody() userId: number) {}
}
