import * as uuid from 'uuid';
import crypto from 'crypto';

import config from "../utils/config.js";
import logger from "../utils/logger.js";

class IdService {
    private asCounter = 0;

    public generateAs() {
        let id = `0a`
        
        const now = new Date(1733176618);
        const time2000 = 946684800000;
        const spacer = 'z'

        let time;
        time = +now - time2000;
	    if (time < 0) time = 0;

        function oneChar() {
            return crypto.randomBytes(1).toString('base64url').slice(1);
        }
        
        id += now.getFullYear().toString(36)
        id += '|'
        id += crypto.randomBytes(1).toString('base64url')
        id += '|'
        id += now.getMonth().toString(36).padStart(2, spacer)
        id += '|'
        id += crypto.randomBytes(1).toString('base64url')
        id += '|'
        id += now.getDate().toString(36).padStart(2, spacer)
        id += '|'
        id += time.toString(36).padStart(8, '0').slice(-8)
        id += '|'
        id += this.asCounter.toString(36).padStart(4, oneChar()).slice(-4)

        id = id.replaceAll('_', oneChar())
        id = id.replaceAll('-', oneChar())
        id = id.replaceAll('|', '')

        this.asCounter++
 
        return id;
    }

    // mk compatability types:
    // aid, aidx, meid, meidg, object-id, ulid

    public generateAid() {
        return;
    }
    public generateAidx() {
        return;
    }
    public generateMeid() {
        return;
    }
    public generateMeidg() {
        return;
    }
    public generateObjectId() {
        return;
    }
    public generateUlid() {
        return;
    }

    public generateUuidv4() {
        return uuid.v4();
    }
    public generateUuidv7() {
        return uuid.v7();
    }

    public generate(): string {
        if (config.id === "as") {
            return this.generateAs();
        } else if (config.id === "uuidv4") {
            return this.generateUuidv4();
        } else if (config.id === "uuidv7") {
            return this.generateUuidv7();
        } else if (config.id === 'aid') {
            return this.generateAid()
        } else if (config.id === 'aidx') {
            return this.generateAidx()
        } else if (config.id === 'meid') {
            return this.generateMeid()
        } else if (config.id === 'meidg') {
            return this.generateMeidg()
        } else if (config.id === 'object-id') {
            return this.generateObjectId()
        } else if (config.id === 'ulid') {
            return this.generateUlid()
        } else {
            logger.warn('id', 'cannot determine type of id to use, using as')
            return this.generateAs();
        }
    }
}

export default new IdService();