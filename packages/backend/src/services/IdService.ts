import * as uuid from 'uuid';
import crypto from 'crypto';
import { customAlphabet } from 'nanoid';
import { ulid } from 'ulid';

import config from "../utils/config.js";
import logger from "../utils/logger.js";

class IdService {    
    private asCounter = 0;
    private aidCounter = crypto.randomBytes(2).readUInt16LE(0);
    private aidxCounter = 0;

    private aidxNodeId = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 4)()

    public generateAs() {
        let id = '0a'
        
        const now = new Date();
        const time2000 = 946684800000;

        let time;
        time = +now - time2000;
	    if (time < 0) time = 0;

        function oneChar() {
            return crypto.randomBytes(1).toString('base64url').slice(1);
        }
        
        id += now.getFullYear().toString(36)
        id += crypto.randomBytes(8).toString('base64url')
        id += time.toString(36).padStart(8, '0').slice(-8)
        id += this.asCounter.toString(36).padStart(4, oneChar()).slice(-4)

        id = id.replaceAll('_', oneChar())
        id = id.replaceAll('-', oneChar())

        this.asCounter++
 
        return id;
    }

    public generateUuidv4() {
        return uuid.v4();
    }
    
    public generateUuidv7() {
        return uuid.v7();
    }

    // mk compatability types:
    // aid, aidx, meid, meidg, object-id, ulid

    public generateAid() {
        let id = '';

        const now = new Date();
        const time2000 = 946684800000;

        let time;
        time = +now - time2000;
	    if (time < 0) time = 0;

        this.aidCounter++

        id += time.toString(36).padStart(8, '0');
        id += this.aidxNodeId
        id += this.aidCounter.toString(36).padStart(2, '0').slice(-2);

        return id;
    }
    public generateAidx() {
        let id = '';

        const now = new Date();
        const time2000 = 946684800000;

        let time;
        time = +now - time2000;
	    if (time < 0) time = 0;

        this.aidxCounter++

        id += time.toString(36).padStart(8, '0');
        id += this.aidxNodeId
        id += this.aidCounter.toString(36).padStart(4, '0').slice(-4);

        return id;
    }
    public generateMeid() {
        let id = '';
        
        const chars = '0123456789abcdef';

        const now = new Date();
        const time2000 = 946684800000;

        let time;
        time = +now - time2000;
	    if (time < 0) time = 0;

        if (time === 0) {
            id += chars[0]
        } else {
            time += 0x800000000000;
            id += time.toString(16).padStart(12, chars[0])
        }

        let str = '';

	    for (let i = 0; i < 12; i++) {
		    str += chars[Math.floor(Math.random() * chars.length)];
	    }

        id += str;
    
        return id;
    }
    public generateMeidg() {
        let id = 'g';
        
        const chars = '0123456789abcdef';

        const now = new Date();
        const time2000 = 946684800000;

        let time;
        time = +now - time2000;
	    if (time < 0) time = 0;

        if (time === 0) {
            id += chars[0]
        } else {
            id += time.toString(16).padStart(11, chars[0])
        }

        let str = '';

	    for (let i = 0; i < 12; i++) {
		    str += chars[Math.floor(Math.random() * chars.length)];
	    }

        id += str;
    
        return id;
    }
    public generateObjectId() {
        let id = '';
        
        const chars = '0123456789abcdef';

        const now = new Date();
        const time2000 = 946684800000;

        let time;
        time = +now - time2000;
	    if (time < 0) time = 0;

        if (time === 0) {
            id += chars[0]
        } else {
            time = Math.floor(time / 1000);
            id += time.toString(16).padStart(8, chars[0])
        }

        let str = '';

	    for (let i = 0; i < 16; i++) {
		    str += chars[Math.floor(Math.random() * chars.length)];
	    }

        id += str;
    
        return id;
    }
    public generateUlid() {    
        return ulid();
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