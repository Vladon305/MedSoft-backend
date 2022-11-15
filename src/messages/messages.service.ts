import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IFile } from 'src/files/file-type';
import { FilesService } from 'src/files/files.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageType } from './entities/message.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messageRepository: Repository<Message>,
    private fileService: FilesService,
  ) {}

  async create(createMessageDto: CreateMessageDto, file?: IFile) {
    if (file) {
      const fileName = this.fileService.createFile(file);
      return await this.messageRepository.save(
        this.messageRepository.create({ ...createMessageDto, file: fileName }),
      );
    } else {
      return await this.messageRepository.save(
        this.messageRepository.create(createMessageDto),
      );
    }
  }

  async findAll(type: MessageType, page = 1, limit = 5) {
    const messages = await this.messageRepository.find({
      where: { type },
      order: {
        id: 'ASC',
      },
      skip: page * limit - limit,
      take: limit,
    });
    return messages;
  }

  async findOne(id: string) {
    return await this.messageRepository.findOne({ where: { id } });
  }

  async remove(id: string) {
    return await this.messageRepository.delete({ id });
  }

  async delete(messages: Message[]) {
    return await this.messageRepository.remove(messages);
  }
  async retyping(messages: Message[]) {
    this.messageRepository.save(messages);
  }
}
