import { Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UserService))
        private userService: UserService,
        private jwtService: JwtService) { }

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.findUserByUsername(username);
        if (!user) {
            throw new NotFoundException();
        }

        const isMatch: boolean = await bcrypt.compare(pass, user?.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload: object = { sub: user.id, username: user.username }
        return {
            user,
            access_token: await this.jwtService.signAsync(payload)
        }

    }

    async hashPassword(pass: string) {
        const salt = await bcrypt.genSalt();
        return await bcrypt.hash(pass, salt);
    }
}
