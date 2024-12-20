class UndoProcessor {
	private async undoAnnounce(body: ApObject): Promise<boolean> {
		return false;
	}
	private async undoCreate(body: ApObject): Promise<boolean> {
		return false;
	}
	private async undoFollow(body: ApObject): Promise<boolean> {
		return false;
	}
	private async undoLike(body: ApObject): Promise<boolean> {
		return false;
	}

	public async process(body: ApObject): Promise<boolean> {
		// todo: Undo types
		// Create, Announce, Follow, Like
		// Add and Remove once I figure out where it's used
		return false;
	}
}

export default new UndoProcessor();
