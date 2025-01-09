import NoteService from './NoteService.js';
import UserService from './UserService.js';

class SearchService {
	public createQuery(search: string) {
		/*
            in:likes
            in:bookmarks
            
            from:@user
            mentions:@user

            has:media

            ""              content, content warning, or media alt text contains
            
            -               Not()
            ~               Like()
        */

		if (search.startsWith('http')) {
			return {
				fetch: true,
				url: search,
				query: {}
			};
		}

		return;
	}

	public async search(
		sources: ('note' | 'user')[],
		query: where,
		take: number
	) {
		let results;

		if (sources.includes('user')) {
			let userResults = await UserService.getMany(query);

			for (const user of userResults) {
				results.push(user);
			}
		} else if (sources.includes('note')) {
			let noteResults = await NoteService.getMany(query);

			noteResults.sort(
				(x, y) =>
					Number(new Date(y.createdAt)) -
					Number(new Date(x.createdAt))
			);

			for (const note of noteResults) {
				results.push(note);
			}
		}

		if (results.length > take) {
			results.length = take;
		}

		return results;
	}
}

export default new SearchService();
