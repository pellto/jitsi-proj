import { Module } from '@nestjs/common';
import { ParticipantService } from './participants.service';
import { ParticipantController } from './participants.controller';
import { ParticipantRepository } from './participants.repository';

@Module({
  imports: [],
  controllers: [ParticipantController],
  providers: [ParticipantService, ParticipantRepository],
  exports: [ParticipantService]
})
export class ParticipantsModule {}
