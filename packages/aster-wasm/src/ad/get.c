#include <stdio.h>
#include <emscripten/emscripten.h>

#include "../http.c"

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

EXTERN EMSCRIPTEN_KEEPALIVE void adGet(char id)
{
	printf("adGet\n");
	http('GET', '/ad/' + id);
}
