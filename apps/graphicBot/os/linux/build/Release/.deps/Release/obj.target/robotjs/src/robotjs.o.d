cmd_Release/obj.target/robotjs/src/robotjs.o := g++ -o Release/obj.target/robotjs/src/robotjs.o ../src/robotjs.cc '-DNODE_GYP_MODULE_NAME=robotjs' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-D__STDC_FORMAT_MACROS' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DBUILDING_NODE_EXTENSION' -I/home/ubuntu/.cache/node-gyp/18.12.1/include/node -I/home/ubuntu/.cache/node-gyp/18.12.1/src -I/home/ubuntu/.cache/node-gyp/18.12.1/deps/openssl/config -I/home/ubuntu/.cache/node-gyp/18.12.1/deps/openssl/openssl/include -I/home/ubuntu/.cache/node-gyp/18.12.1/deps/uv/include -I/home/ubuntu/.cache/node-gyp/18.12.1/deps/zlib -I/home/ubuntu/.cache/node-gyp/18.12.1/deps/v8/include -I../../nan  -fPIC -pthread -Wall -Wextra -Wno-unused-parameter -m64 -Wall -Wparentheses -Winline -Wbad-function-cast -Wdisabled-optimization -O3 -fno-omit-frame-pointer -fno-rtti -fno-exceptions -std=gnu++17 -MMD -MF ./Release/.deps/Release/obj.target/robotjs/src/robotjs.o.d.raw   -c
Release/obj.target/robotjs/src/robotjs.o: ../src/robotjs.cc \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/node.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/cppgc/common.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8config.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-array-buffer.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-local-handle.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-internal.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-version.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8config.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-object.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-maybe.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-persistent-handle.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-weak-callback-info.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-primitive.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-data.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-value.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-traced-handle.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-container.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-context.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-snapshot.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-date.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-debug.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-script.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-message.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-exception.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-extension.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-external.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-function.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-function-callback.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-template.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-memory-span.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-initialization.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-callbacks.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-isolate.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-embedder-heap.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-microtask.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-statistics.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-promise.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-unwinder.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-embedder-state-scope.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-platform.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-json.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-locker.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-microtask-queue.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-primitive-object.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-proxy.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-regexp.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-typed-array.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-value-serializer.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-wasm.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_version.h \
 ../../nan/nan.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_version.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/errno.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/version.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/unix.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/threadpool.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/linux.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_buffer.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/node.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_object_wrap.h \
 ../../nan/nan_callbacks.h ../../nan/nan_callbacks_12_inl.h \
 ../../nan/nan_maybe_43_inl.h ../../nan/nan_converters.h \
 ../../nan/nan_converters_43_inl.h ../../nan/nan_new.h \
 ../../nan/nan_implementation_12_inl.h ../../nan/nan_persistent_12_inl.h \
 ../../nan/nan_weak.h ../../nan/nan_object_wrap.h ../../nan/nan_private.h \
 ../../nan/nan_typedarray_contents.h ../../nan/nan_json.h \
 ../../nan/nan_scriptorigin.h \
 /home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8.h ../src/mouse.h \
 ../src/os.h ../src/types.h ../src/inline_keywords.h \
 ../src/deadbeef_rand.h ../src/keypress.h ../src/keycode.h \
 ../src/screen.h ../src/screengrab.h ../src/MMBitmap.h ../src/rgb.h \
 ../src/snprintf.h ../src/microsleep.h ../src/xdisplay.h
../src/robotjs.cc:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/node.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/cppgc/common.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8config.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-array-buffer.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-local-handle.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-internal.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-version.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8config.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-object.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-maybe.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-persistent-handle.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-weak-callback-info.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-primitive.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-data.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-value.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-traced-handle.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-container.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-context.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-snapshot.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-date.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-debug.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-script.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-message.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-exception.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-extension.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-external.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-function.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-function-callback.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-template.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-memory-span.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-initialization.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-callbacks.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-isolate.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-embedder-heap.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-microtask.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-statistics.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-promise.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-unwinder.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-embedder-state-scope.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-platform.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-json.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-locker.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-microtask-queue.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-primitive-object.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-proxy.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-regexp.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-typed-array.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-value-serializer.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8-wasm.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_version.h:
../../nan/nan.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_version.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/errno.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/version.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/unix.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/threadpool.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/uv/linux.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_buffer.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/node.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/node_object_wrap.h:
../../nan/nan_callbacks.h:
../../nan/nan_callbacks_12_inl.h:
../../nan/nan_maybe_43_inl.h:
../../nan/nan_converters.h:
../../nan/nan_converters_43_inl.h:
../../nan/nan_new.h:
../../nan/nan_implementation_12_inl.h:
../../nan/nan_persistent_12_inl.h:
../../nan/nan_weak.h:
../../nan/nan_object_wrap.h:
../../nan/nan_private.h:
../../nan/nan_typedarray_contents.h:
../../nan/nan_json.h:
../../nan/nan_scriptorigin.h:
/home/ubuntu/.cache/node-gyp/18.12.1/include/node/v8.h:
../src/mouse.h:
../src/os.h:
../src/types.h:
../src/inline_keywords.h:
../src/deadbeef_rand.h:
../src/keypress.h:
../src/keycode.h:
../src/screen.h:
../src/screengrab.h:
../src/MMBitmap.h:
../src/rgb.h:
../src/snprintf.h:
../src/microsleep.h:
../src/xdisplay.h:
