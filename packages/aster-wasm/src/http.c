#include <stdio.h>
#include <string.h>
#include <emscripten/fetch.h>

const char *http(char *type, char *endpoint)
{
	if (type == "GET")
	{
		printf("http GET\n");

		emscripten_fetch_attr_t attr;
		emscripten_fetch_attr_init(&attr);
		strcpy(attr.requestMethod, "GET");
		attr.attributes = EMSCRIPTEN_FETCH_LOAD_TO_MEMORY | EMSCRIPTEN_FETCH_SYNCHRONOUS;
		emscripten_fetch_t *fetch = emscripten_fetch(&attr, strcat("/api/v1/", endpoint));
		if (fetch->status == 200)
		{
			printf("Finished downloading %llu bytes from URL %s.\n", fetch->numBytes, fetch->url);
			return fetch->data;
		}
		else
		{
			printf("Downloading %s failed, HTTP failure status code: %d.\n", fetch->url, fetch->status);
			return fetch->data;
		}
		emscripten_fetch_close(fetch);
	}
	else if (type == "POST")
	{
		printf("http POST\n");
	}
}
