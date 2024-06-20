import { Ads } from "../entities/Ad.js";

export default async function buildAd(grabbedAd) {
	var ad = new Ads();

	ad.id = grabbedAd.id;
	ad.created_at = grabbedAd.created_at;
	ad.expire_at = grabbedAd.expire_at;
	ad.url = grabbedAd.url;
	ad.alt = grabbedAd.alt;
	ad.link = grabbedAd.link;
	ad.comment = grabbedAd.comment;

	return ad;
}
