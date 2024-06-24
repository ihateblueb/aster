mkdir -p built
emcc src/main.c -o built/main.html --shell-file src/template.html --bind -s NO_EXIT_RUNTIME=1 -s "EXPORTED_RUNTIME_METHODS=['ccall']" -s FETCH
