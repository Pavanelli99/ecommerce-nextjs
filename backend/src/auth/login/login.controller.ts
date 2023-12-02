import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Response,
  UseGuards,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { AuthGuard } from '../auth.guard';

type LoginResponse = {
  statusCode?: number;
  message: string;
  success: boolean;

  token: string;
  data?: any;
};

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  // @UseGuards(AuthGuard)
  async check_login(@Body() createLoginDto, @Response() res) {
    try {
      const user = await this.loginService.login(createLoginDto);
      console.log(user);

      res.cookie('token', user.access_token, {
        expires: new Date(new Date().getTime() + 30 * 1000),
        sameSite: 'strict',
        httpOnly: true,
      });

      return res.send({
        statusCode: 200,
        message: 'Login successful',
        success: true,

        token: user.access_token,
      });
    } catch (error: any) {
      return res.send({
        statusCode: 400,
        message: error.message,
        success: false,
        token: null,
      });
    }
  }

  @Get('current')
  async current_user(@Req() req, @Response() res): Promise<LoginResponse> {
    try {
      if (!req.headers.authorization) throw new Error('No token provided');
      const token = req.headers.authorization.split(' ')[1];

      const user = await this.loginService.checkToken(token);

      return res.send({
        statusCode: 200,
        message: 'User found',
        success: true,
        token: token,
        data: user,
      });
    } catch (error: any) {
      return res.send({
        statusCode: 400,
        message: error.message,
        success: false,
        token: null,
      });
    }
  }

  @Get('check')
  async check_token(@Response() res): Promise<LoginResponse> {
    try {
      const token = res.req.headers.authorization.split(' ')[1];
      const user = await this.loginService.checkToken(token);
      return res.send({
        statusCode: 200,
        message: 'Token is valid',
        success: true,
        token: user,
      });
    } catch (error: any) {
      return res.send({
        statusCode: 400,
        message: error.message,
        success: false,
        token: null,
      });
    }
  }
}
