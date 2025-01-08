import db from "../utils/database";

class LikeService {
    public async get(where: where) {
        return await db
            .getRepository('note_like')
            .createQueryBuilder('note_like')
            .leftJoinAndSelect('note_like.user', 'user')
            .leftJoinAndSelect('note_like.note', 'note')
            .where(where)
            .getOne();
    }

    public async getMany(where: where) {
        return await db
            .getRepository('note_like')
            .createQueryBuilder('note_like')
            .leftJoinAndSelect('note_like.user', 'user')
            .leftJoinAndSelect('note_like.note', 'note')
            .where(where)
            .getMany();
    }
}

export default new LikeService();