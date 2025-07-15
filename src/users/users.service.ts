import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CompleteProfileDto } from 'src/auth/dto/register.dto';
import { Division } from 'src/static-data/entities/division.entity';


@Injectable()
export class UsersService {
   private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Division) private divisionRepository: Repository<Division>,


  ) {}

   private async generateUserId(): Promise<string> {
    const count = await this.userRepository.count();
    const paddedNumber = (count + 1).toString().padStart(6, '0');
    const newUserId = `CA/ABJ/${paddedNumber}`;
    this.logger.log(`Generated new userId: ${newUserId}`); // Log generated userId
    return newUserId;
  }

  async register( createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      this.logger.warn(`Conflict: User with email ${createUserDto.email} already exists.`);
      throw new ConflictException('Email already in use');
    }


    const userId = await this.generateUserId();
    this.logger.debug(`Assigning generated userId ${userId} to new user with email ${createUserDto.email}`);

    const user = this.userRepository.create({
      ...createUserDto,
      userId: userId
    });

    const savedUser = await this.userRepository.save(user);
    this.logger.log(`User created successfully with ID: ${savedUser.id} and userId: ${savedUser.userId}`);
    const { password, ...result } = savedUser;
    return result;
  }



async findAll(requestingUserId: string, ) {
  const requestingUser = await this.userRepository.findOne({ 
    where: { id: requestingUserId },
    select: ['id', 'role']
  });

  if (!requestingUser) {
    throw new NotFoundException('Requesting user not found');
  }
  if (requestingUser.role === 'user' ) {
    throw new ForbiddenException('Only admin users can access this resource');
  }

  const queryBuilder = this.userRepository
    .createQueryBuilder('user')
    .where('user.id != :requestingUserId', { requestingUserId })
    .andWhere('user.role != :superAdminRole', { superAdminRole: 'super_admin' });



  const [users, total] = await queryBuilder.getManyAndCount();

  const usersDetails = users.map((user) => {
    const { password, ...result } = user;
    return result;
  });

  return {
    data: usersDetails,

  };
}


  async findOne(id: string): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({ where: { id }});
    if (!user) {
      return null;
    }
    const { password, ...result } = user;
    return result;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    requestUser: User
  ): Promise<Partial<User>> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Don't allow role updates through this method (have a separate admin method)
    if (updateUserDto.role) {
      delete updateUserDto.role;
    }

    // Hash password if it's being updated
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.userRepository.update(id, updateUserDto);
    const updatedUser = await this.userRepository.findOne({ 
      where: { id },
       select: ['id', 'email', 'role', 'fullName', 'phoneNumber', 'profileImage', 'digitalSignature', 'isVerified', 'userId'] 
    });

    
    return updatedUser as User;
  }

  async changeRole(
  requestingUser: User,
  userId: string,
  newRole: string
): Promise<Partial<User>> {
  const requester = await this.userRepository.findOne({
    where: { id: requestingUser.id },
    select: ['id', 'role'],
  });

  if (!requester || requester.role !== 'super_admin') {
    throw new ForbiddenException('Only super_admin can change roles');
  }

  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

  user.role = newRole;
  await this.userRepository.save(user);

  const { password, ...result } = user;
  return result;
}


async deleteUser(requestingUser: User, userId: string): Promise<void> {
  const requester = await this.userRepository.findOne({
    where: { id: requestingUser.id },
    select: ['id', 'role'],
  });

  if (!requester || requester.role !== 'super_admin') {
    throw new ForbiddenException('Only super_admin can delete users');
  }

  const user = await this.userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

  await this.userRepository.delete(userId);


}





async verifyUser(email: string): Promise<User> {
  const user = await this.userRepository.findOne({ where: { email } });
  if (!user) {
    throw new NotFoundException('User not found');
  }

  user.isVerified = true;
  return this.userRepository.save(user);
}

async completeProfile(userId: string, completeProfileDto: CompleteProfileDto) {
    const updateData: Partial<User> = {};

    if (completeProfileDto.profileImage) {
      updateData.profileImage = `data:${completeProfileDto.profileImage.contentType};base64,${completeProfileDto.profileImage.data}`;
    }

    if (completeProfileDto.digitalSignature) {
      updateData.digitalSignature = `data:${completeProfileDto.digitalSignature.contentType};base64,${completeProfileDto.digitalSignature.data}`;
    }

    if (completeProfileDto.divisionId) {
      const division = await this.divisionRepository.findOne({ where: { id: completeProfileDto.divisionId } });
      if (!division) {
        throw new BadRequestException('Invalid division ID provided');
      }
      updateData.division = division;
    }

    await this.userRepository.update(userId, updateData);

    const user = await this.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found after update');
    }

    return user;
  }

}
