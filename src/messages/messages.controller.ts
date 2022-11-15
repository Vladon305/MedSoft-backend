import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Message, MessageType } from './entities/message.entity';
import { PaginationParams } from 'src/params/pagination-params';
import { IFile } from 'src/files/file-type';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() createMessageDto: CreateMessageDto,
    @UploadedFile() file?: IFile,
  ) {
    if (file) return this.messagesService.create(createMessageDto, file);
    return this.messagesService.create(createMessageDto);
  }

  @Get(':type')
  findAll(
    @Query() { page, limit }: PaginationParams,
    @Param('type') type: MessageType,
  ) {
    return this.messagesService.findAll(type, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }

  @Post('/delete')
  delete(@Body() messages: Message[]) {
    return this.messagesService.delete(messages);
  }
  @Post('/retyping')
  retyping(@Body() messages: Message[]) {
    return this.messagesService.retyping(messages);
  }
}
