import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { RoomService } from './rooms.service';
import { CreateRoomReq, LeaveRoomReq, ParticipateRoomReq } from '../dto/req/room.req';

@Controller("api/rooms")
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  getRooms(): any {
    return this.roomService.getRooms();
  }

  @Get('/:name/number-of-participants')
  getNumberOfCurrentParticipantByRoomName(@Param('name') name: string): any {
    return this.roomService.getNumberOfParticipateByName(name);
  }

  @Post()
  createRooms(@Body() req: CreateRoomReq): void {
    this.roomService.createRoom(req.name);
  }

  @Post("/:name/participations")
  participateRoom(@Param("name") name: string, @Body() req: ParticipateRoomReq) {
    this.roomService.participateRoom(name, req.participant)
  }
  
  @Delete("/:name/leave")
  leaveRoom(@Param("name") name: string, @Body() req: LeaveRoomReq) {
    this.roomService.leaveRoom(name, req.participant.jid)
  }
}
