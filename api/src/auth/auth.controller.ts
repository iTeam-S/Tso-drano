import { Body, Controller, HttpCode, NotAcceptableException, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Post('sign-in')
    @HttpCode(200)
    async signIn(@Body() donnees: AuthDto) {
        if(!donnees.hasOwnProperty('identifiant') || !donnees.hasOwnProperty('password'))
            throw new NotAcceptableException('Credentials incorrect!'); 
        return await this.authService.authenticate(donnees);
    }
}
