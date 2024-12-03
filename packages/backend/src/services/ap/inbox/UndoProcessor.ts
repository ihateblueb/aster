class UndoProcessor {
	private async undoAnnounce(body): Promise<boolean> {
		return false;
	}
	private async undoCreate(body): Promise<boolean> {
		return false;
	}
	private async undoFollow(body): Promise<boolean> {
		return false;
	}
	private async undoLike(body): Promise<boolean> {
		return false;
	}

	public async process(body): Promise<boolean> {
		// todo: Undo types
		// Create, Announce, Follow, Like
		// Add and Remove once I figure out where it's used
		return false;
	}
}

export default new UndoProcessor();
