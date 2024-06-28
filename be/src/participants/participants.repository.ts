import { Injectable } from "@nestjs/common";
import { Participant } from "./participatns.entity";
import { makeJid } from "../utils/random.string-generator";
import { JID_LENGTH } from "../utils/const";

@Injectable()
export class ParticipantRepository {
  id = 0;
  participants: {[id: number]: Participant} = {};

  create(name: string, jid?: string): Participant {
    const _jid = jid ? jid : makeJid(JID_LENGTH);
    const participant = { id: this.id, jid: _jid, name };
    this.participants = {...this.participants, [this.id]: participant};
    this.id += 1;
    return participant;
  }

  getParticipants(): {[id: number]: Participant}{
    return this.participants;
  }

  getParticipantById(id: number): Participant {
    return this.participants[id];
  }

  getParticipantByJid(jid: string): Participant {
    const participant = Object.values(this.participants).filter((part) => {
      return part.jid === jid;
    })
    return participant[0];
  }
}