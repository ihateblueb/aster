export default async function buildAd(grabbedAd) {
	var adJson = {};

	adJson['id'] = grabbedAd.id;
	adJson['created_at'] = grabbedAd.created_at;
	adJson['expire_at'] = grabbedAd.expire_at;
	adJson['url'] = grabbedAd.url;
	adJson['alt'] = grabbedAd.alt;
	adJson['link'] = grabbedAd.link;
	adJson['comment'] = grabbedAd.comment;

	return adJson;
}
