import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [RoomsModule, ParticipantsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
