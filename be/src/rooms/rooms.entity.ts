import { Participant } from "../participants/participatns.entity";

export class Room {
  id: number;
  name: string;
  participants?: Participant[]
  createdAt?: Date;
  deletedAt?: Date;
}