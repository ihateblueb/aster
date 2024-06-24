#include <stdio.h>
#include <string.h>
#include <emscripten/fetch.h>

#ifdef __cplusplus
#define EXTERN extern "C"
#else
#define EXTERN
#endif

EXTERN void http(char type, char endpoint)
{
	if (type == "GET")
	{
		printf("http GET");

		emscripten_fetch_attr_t attr;
		emscripten_fetch_attr_init(&attr);
		strcpy(attr.requestMethod, "GET");
		attr.attributes = EMSCRIPTEN_FETCH_LOAD_TO_MEMORY | EMSCRIPTEN_FETCH_SYNCHRONOUS;
		emscripten_fetch_t *fetch = emscripten_fetch(&attr, &endpoint);
		if (fetch->status == 200)
		{
			printf("Finished downloading %llu bytes from URL %s.\n", fetch->numBytes, fetch->url);
		}
		else
		{
			printf("Downloading %s failed, HTTP failure status code: %d.\n", fetch->url, fetch->status);
		}
		emscripten_fetch_close(fetch);
	}
	else if (type == "POST")
	{
		printf("http POST");
	}
}
