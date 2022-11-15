import { IsString, IsEnum } from 'class-validator';
import { MessageType } from '../entities/message.entity';

export const MessageTypeArray: MessageType[] = ['income', 'outcome', 'draft'];

export class CreateMessageDto {
  @IsString({ message: 'Title должен быть строкой' })
  title: string;

  @IsString({ message: 'Message должен быть строкой' })
  message: string;

  @IsEnum(MessageTypeArray)
  type: 'income' | 'outcome' | 'draft';
}
