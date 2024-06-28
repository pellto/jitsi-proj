import { Injectable } from "@nestjs/common";
import { ParticipantRepository } from "./participants.repository";
import { ParticipantDto } from "../dto/participant.dto";

@Injectable()
export class ParticipantService {
  constructor(private participantRepository: ParticipantRepository) {}

  getParticipants(): ParticipantDto[] {
    return Object.values(this.participantRepository.getParticipants());
  }

  createParticipant(name: string) {
    return this.participantRepository.create(name);
  }

  createParticipantWithJid(displayName: string, jid: string): ParticipantDto {
    return this.participantRepository.create(displayName, jid);
  }

  getParticipantById(id: number): ParticipantDto {
    return this.participantRepository.getParticipantById(id);
  }

  getParticipantByJid(jid: string): ParticipantDto {
    return this.participantRepository.getParticipantByJid(jid);
  }
}