import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { ParticipantDto } from "../participant.dto";
import { Type } from "class-transformer";

export class CreateRoomReq {
  @ApiProperty({description: 'room 이름'})
  @IsString()
  name: string;
}

export class ParticipateRoomParticipantInfo {
  @ApiProperty()
  @IsString()
  jid: string
  @ApiProperty()
  @IsString()
  displayName: string
}

export class ParticipateRoomReq {
  @ApiProperty({description: 'room 이름'})
  @ValidateNested({each: true})
  @Type(() => ParticipateRoomParticipantInfo)
  participant: ParticipateRoomParticipantInfo;
}

export class LeaveParticipantInfo {
  @ApiProperty()
  @IsString()
  jid: string
}

export class LeaveRoomReq {
  @ApiProperty({description: 'room 이름'})
  @ValidateNested({each: true})
  @Type(() => LeaveParticipantInfo)
  participant: LeaveParticipantInfo;
}