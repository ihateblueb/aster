import IUndoFollow from './undo/follow.js';
import IUndoLike from './undo/follow.js';

export default async function IUndo(body) {
	if (body.object.type === 'Follow') {
		await IUndoFollow(body);
	} else if (body.object.type === 'Like') {
		await IUndoLike(body);
	} else {
		return;
	}
}
