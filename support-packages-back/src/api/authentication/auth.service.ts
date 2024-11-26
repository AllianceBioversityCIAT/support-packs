import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.services';
import { SpUsersService } from '../sp-users/sp-users.service';
import { RegisterUsersDto } from './dto/register-user';
import { Users } from '../sp-users/models/users.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private jwtService: JwtService,
    private readonly usersService: SpUsersService,
  ) {}

  async login(loginDto: LoginDto): Promise<any> {
    const { email, password, app_id } = loginDto;

    const users = await this.prismaService.sp_users.findUnique({
      where: { email },
      include: {
        permissions: {
          where: { app_id: parseInt(app_id) },
        },
      },
    });

    if (!users) {
      return 'userNotFound';
    }

    if (users.permissions.length === 0) {
      return 'notPermission';
    }

    const validatePassword = await bcrypt.compare(password, users.password);

    if (!validatePassword) {
      return 'invalidPassword';
    }

    return {
      token: this.jwtService.sign(
        { email },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      ),
    };
  }

  async register(createDto: RegisterUsersDto): Promise<any> {
    const createUser = new Users();
    createUser.first_name = createDto.first_name;
    createUser.last_name = createDto.last_name;
    createUser.email = createDto.email;
    createUser.password = await bcrypt.hash(createDto.password, 10);
    createUser.is_cgiar = createDto.is_cgiar;
    const user = await this.usersService.createUser(createUser);

    return {
      token: this.jwtService.sign({ email: user.email }),
    };
  }
}
