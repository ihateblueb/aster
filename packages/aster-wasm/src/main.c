#include <stdio.h>
#include <emscripten/emscripten.h>

#include "ad/get.c"
#include "ad/getRandom.c"

#include "followrequest/accept.c"
#include "followrequest/deny.c"
#include "followrequest/get.c"

#include "note/bookmark.c"
#include "note/create.c"
#include "note/delete.c"
#include "note/edit.c"
#include "note/get.c"
#include "note/like.c"
#include "note/pin.c"
#include "note/quote.c"
#include "note/react.c"
#include "note/repeat.c"
#include "note/report.c"
#include "note/unpin.c"

#include "notifications/get.c"

#include "search/get.c"

#include "user/bite.c"
#include "user/follow.c"
#include "user/get.c"
#include "user/lookup.c"
#include "user/report.c"

int main()
{
	printf("aster-wasm has been loaded\n");
	return 0;
}
