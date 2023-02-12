import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable({})
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  /**
   * It takes a user's email and password, hashes the password, and saves the user in the database
   * @param {AuthDto} dto - AuthDto - this is the data transfer object that we created earlier.
   * @returns The user object is being returned.
   */
  async signup(dto: AuthDto) {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    try {
      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      // delete hash password from user object
      // delete user.hash;

      // return the saved user
      // return user;
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ForbiddenException('Credentials taken');
      }
    }
  }

  /**
   * We're using the Prisma client to find a user by their email address, then we're using the Argon2
   * library to verify the password. If the password is correct, we return the user
   * @param {AuthDto} dto - AuthDto
   * @returns The user object is being returned.
   */
  async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user dose not exist throw exception
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // compare password
    const pwMatches = await argon.verify(user.hash, dto.password);
    // if password incorrect throw exception
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }
    // send back the user
    // delete user.hash;
    // return user;

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });

    return {
      access_token: token,
    };
  }
}
