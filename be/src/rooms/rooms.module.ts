import { Module } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { RoomController } from './rooms.controller';
import { ParticipantsModule } from '../participants/participants.module';
import { RoomRepository } from './rooms.repository';

@Module({
  imports: [ParticipantsModule],
  controllers: [RoomController],
  providers: [RoomService, RoomRepository]
})
export class RoomsModule {}
