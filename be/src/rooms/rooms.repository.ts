import { Injectable } from "@nestjs/common";
import { Room } from "./rooms.entity";
import { ParticipantDto } from "../dto/participant.dto";

@Injectable()
export class RoomRepository {
  private id: number = 0;
  private rooms: {[id: number]: Room} = {};

  create(name: string): Room {
    const room: Room = {
      id: this.id,
      participants: [],
      createdAt: new Date(),
      name
    }
    this.rooms = {...this.rooms, [this.id]: room}
    this.id += 1;
    return room;
  }

  getByName(name: string): Room {
    const room = Object.values(this.rooms).filter((room) => {
      return room.name === name;
    })
    return room[0];
  }
  
  getById(roomId: number): Room {
    return this.rooms[roomId];
  }

  getRooms(): {[id: number]: Room} {
    return this.rooms;
  }

  getCurrentId(): number {
    return this.id;
  }

  addParticipant(id: number, participant: ParticipantDto & {displayName: string}) {
    this.rooms[id].participants.push(participant);
  }

  leaveParticipantByRoomId(roomId: number, participant: ParticipantDto): void {
    this.rooms[roomId].participants = this.rooms[roomId].participants.filter((part) => part.id !== participant.id);
  }

  removeByName(roomName: string) {
    for (const key of Object.keys(this.rooms)) {
      const room: Room = this.rooms[key];
      if (room.name === roomName) {
        this.rooms[key] = {
          ...room,
          name: `deleted_room_${roomName}`,
          deletedAt: new Date(),
        }
      }
    }
  }
}