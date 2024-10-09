import db from "../utils/database.js";

class NoteService {
	public async get(where: object) {
        // todo: joins needed here
		return await db.getRepository('user').findOne({ where: where });
	}
}

export default new NoteService();