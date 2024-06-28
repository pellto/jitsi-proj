import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { RoomRepository } from "./rooms.repository";
import { ParticipantService } from "../participants/participants.service";
import { ParticipantDto } from "../dto/participant.dto";
import { Room } from "./rooms.entity";
import { ParticipateRoomParticipantInfo } from "../dto/req/room.req";
import { MAX_USER_PER_ROOM } from "../utils/const";

@Injectable()
export class RoomService {
  constructor(
    private roomRepository: RoomRepository,
    private participantService: ParticipantService
  ) {}

  getRooms = () => {
    return this.roomRepository.getRooms();
  }

  createRoom(name: string): Room {
    return this.roomRepository.create(name);
  }

  participateRoom(roomName: string, participantInfo: ParticipateRoomParticipantInfo) {
    let participant: ParticipantDto = this.participantService.getParticipantByJid(participantInfo.jid);
    if (!participant) {
      participant = this.participantService.createParticipantWithJid(participantInfo.displayName, participantInfo.jid)
    }
    let roomInfo = this.roomRepository.getByName(roomName);
    if (!roomInfo) {
      roomInfo = this.createRoom(roomName)
    }
    if (roomInfo.participants.length >= MAX_USER_PER_ROOM) {
      throw new HttpException("The maximum number of users has been reached.", HttpStatus.CONFLICT);
    }

    this.roomRepository.addParticipant(roomInfo.id, {...participant, displayName: participantInfo.displayName});
  }

  removeRoom(roomName: string) {
    this.roomRepository.removeByName(roomName);
  }

  leaveRoom(roomName: string, participantJid: string) {
    const participant: ParticipantDto = this.participantService.getParticipantByJid(participantJid);
    if (!participant) {
      throw new HttpException('Not Found participant.', HttpStatus.NOT_FOUND);
    }
    let roomInfo = this.roomRepository.getByName(roomName);
    if (!roomInfo) {
      throw new HttpException('Not Found room.', HttpStatus.NOT_FOUND);
    }

    this.roomRepository.leaveParticipantByRoomId(roomInfo.id, participant);
    roomInfo = this.roomRepository.getByName(roomName);
    if (roomInfo.participants.length === 0) {
      this.removeRoom(roomName);
    }    
  }

  getNumberOfParticipateById(roomId: number): number {
    const room = this.roomRepository.getById(roomId);
    return room ? room.participants.length : 0;
  }

  getNumberOfParticipateByName(name: string): number {
    const room = this.roomRepository.getByName(name);
    return room ? room.participants.length : 0;
  }
}