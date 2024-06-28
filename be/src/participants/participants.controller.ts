import { Body, Controller, Get, Post } from '@nestjs/common';
import { ParticipantService } from './participants.service';
import { CreateParticipantReq } from '../dto/req/participant.req';
import { ParticipantDto } from '../dto/participant.dto';

@Controller("api/participants")
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  getparticipants(): ParticipantDto[] {
    return this.participantService.getParticipants();
  }

  @Post()
  createparticipants(@Body() req: CreateParticipantReq): void {
    this.participantService.createParticipant(req.name);
  }
}
