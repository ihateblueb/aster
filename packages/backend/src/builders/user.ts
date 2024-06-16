export default async function buildUser(grabbedUser) {
	var userJson = {};

	userJson['id'] = grabbedUser.id;
	userJson['username'] = grabbedUser.username;
	userJson['host'] = grabbedUser.host;
	userJson['local'] = grabbedUser.local;
	userJson['url'] = grabbedUser.url;
	userJson['displayname'] = grabbedUser.displayname;
	userJson['locked'] = grabbedUser.locked;
	userJson['suspended'] = grabbedUser.suspended;
	userJson['deactivated'] = grabbedUser.deactivated;
	userJson['discoverable'] = grabbedUser.discoverable;
	userJson['automated'] = grabbedUser.automated;
	userJson['avatar'] = grabbedUser.avatar;
	userJson['banner'] = grabbedUser.banner;
	userJson['background'] = grabbedUser.background;
	userJson['bio'] = grabbedUser.bio;
	userJson['is_cat'] = grabbedUser.is_cat;
	userJson['speak_as_cat'] = grabbedUser.speak_as_cat;
	userJson['created_at'] = grabbedUser.created_at;
	userJson['updated_at'] = grabbedUser.updated_at;
	userJson['pinned_notes'] = grabbedUser.pinned_notes;

	return userJson;
}
