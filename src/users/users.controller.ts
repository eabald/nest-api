import { UsersService } from './users.service';
import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Delete,
  Get,
  Res,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { RequestWithUser } from '../authentication/requestWithUser.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { FindOneParams } from '../utils/findOneParams';
import { JwtTwoFactorGuard } from 'src/authentication/jwt-two-factor.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('avatar')
  @UseGuards(JwtTwoFactorGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addAvatar(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addAvatar(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Delete('avatar')
  @UseGuards(JwtTwoFactorGuard)
  async deleteAvatar(@Req() request: RequestWithUser) {
    return this.usersService.deleteAvatar(request.user.id);
  }

  @Post('files')
  @UseGuards(JwtTwoFactorGuard)
  @UseInterceptors(FileInterceptor('file'))
  async addPrivateFile(
    @Req() request: RequestWithUser,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.usersService.addPrivateFile(
      request.user.id,
      file.buffer,
      file.originalname,
    );
  }

  @Get('files/:id')
  @UseGuards(JwtTwoFactorGuard)
  async getPrivateFile(
    @Req() request: RequestWithUser,
    @Param() { id }: FindOneParams,
    @Res() res: Response,
  ) {
    const file = await this.usersService.getPrivateFile(
      request.user.id,
      Number(id),
    );
    file.stream.pipe(res);
  }

  @Get('files')
  @UseGuards(JwtTwoFactorGuard)
  async getAllPrivateFiles(@Req() request: RequestWithUser) {
    return this.usersService.getAllPrivateFiles(request.user.id);
  }
}
