import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export default function sanitize(content: string) {
	const window = new JSDOM('').window;
	const purify = DOMPurify(window);

	return purify.sanitize(content, {
		FORBID_TAGS: ['span', 'a']
	});
}

/*
hii im harper<br/><br/>minor!!!!<br/><br/>bad programmer, subpar sysadmin, silly creature, <a href="http://eepy.zone">eepy.zone</a> admin<br/><br/>feel free to follow request, the vibe will be checked<br/><br/>main <span class="h-card"><a class="u-url mention" data-user="AfWd11FKYpxP9vLbWa" href="https://eepy.zone/@blueb" rel="ugc">@<span>blueb@eepy.zone</span></a></span><br/>alt.. 2! <span class="h-card"><a class="u-url mention" data-user="AfWvgU0b1bptWReRBw" href="https://labyrinth.zone/users/blueb" rel="ugc">@<span>blueb@labyrinth.zone</span></a></span><br/>private <span class="h-card"><a class="u-url mention" data-user="AhCUPFC0hDemBN9Tyy" href="https://grimgreenfo.rest/@blueb" rel="ugc">@<span>blueb@grimgreenfo.rest</span></a></span>
*/
