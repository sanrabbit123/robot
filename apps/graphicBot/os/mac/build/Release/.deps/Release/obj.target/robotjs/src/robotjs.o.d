cmd_Release/obj.target/robotjs/src/robotjs.o := c++ -o Release/obj.target/robotjs/src/robotjs.o ../src/robotjs.cc '-DNODE_GYP_MODULE_NAME=robotjs' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_GLIBCXX_USE_CXX11_ABI=1' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DBUILDING_NODE_EXTENSION' -I/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node -I/Users/uragen/Library/Caches/node-gyp/17.3.0/src -I/Users/uragen/Library/Caches/node-gyp/17.3.0/deps/openssl/config -I/Users/uragen/Library/Caches/node-gyp/17.3.0/deps/openssl/openssl/include -I/Users/uragen/Library/Caches/node-gyp/17.3.0/deps/uv/include -I/Users/uragen/Library/Caches/node-gyp/17.3.0/deps/zlib -I/Users/uragen/Library/Caches/node-gyp/17.3.0/deps/v8/include -I../../nan -I../System/Library/Frameworks/CoreFoundation.Framework/Headers -I../System/Library/Frameworks/Carbon.Framework/Headers -I../System/Library/Frameworks/ApplicationServices.framework/Headers -I../System/Library/Frameworks/OpenGL.framework/Headers  -O3 -gdwarf-2 -mmacosx-version-min=10.13 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=gnu++17 -stdlib=libc++ -fno-rtti -fno-exceptions -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/robotjs/src/robotjs.o.d.raw   -c
Release/obj.target/robotjs/src/robotjs.o: ../src/robotjs.cc \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/cppgc/common.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8config.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-array-buffer.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-local-handle.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-internal.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-version.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-object.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-maybe.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-persistent-handle.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-weak-callback-info.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-primitive.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-data.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-value.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-traced-handle.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-container.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-context.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-snapshot.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-date.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-debug.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-exception.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-extension.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-external.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-function.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-function-callback.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-message.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-template.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-memory-span.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-initialization.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-isolate.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-callbacks.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-embedder-heap.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-microtask.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-statistics.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-promise.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-unwinder.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-platform.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-json.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-locker.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-microtask-queue.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-primitive-object.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-proxy.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-regexp.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-script.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-typed-array.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-value-serializer.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-wasm.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node_version.h \
  ../../nan/nan.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/errno.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/version.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/unix.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/threadpool.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/darwin.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node_buffer.h \
  /Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node_object_wrap.h \
  ../../nan/nan_callbacks.h ../../nan/nan_callbacks_12_inl.h \
  ../../nan/nan_maybe_43_inl.h ../../nan/nan_converters.h \
  ../../nan/nan_converters_43_inl.h ../../nan/nan_new.h \
  ../../nan/nan_implementation_12_inl.h \
  ../../nan/nan_persistent_12_inl.h ../../nan/nan_weak.h \
  ../../nan/nan_object_wrap.h ../../nan/nan_private.h \
  ../../nan/nan_typedarray_contents.h ../../nan/nan_json.h \
  ../../nan/nan_scriptorigin.h ../src/mouse.h ../src/os.h ../src/types.h \
  ../src/inline_keywords.h ../src/deadbeef_rand.h ../src/keypress.h \
  ../src/keycode.h ../src/screen.h ../src/screengrab.h ../src/MMBitmap.h \
  ../src/rgb.h ../src/snprintf.h ../src/microsleep.h
../src/robotjs.cc:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/cppgc/common.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8config.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-array-buffer.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-local-handle.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-internal.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-version.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-object.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-maybe.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-persistent-handle.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-weak-callback-info.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-primitive.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-data.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-value.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-traced-handle.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-container.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-context.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-snapshot.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-date.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-debug.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-exception.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-extension.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-external.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-function.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-function-callback.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-message.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-template.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-memory-span.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-initialization.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-isolate.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-callbacks.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-embedder-heap.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-microtask.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-statistics.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-promise.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-unwinder.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-platform.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-json.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-locker.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-microtask-queue.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-primitive-object.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-proxy.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-regexp.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-script.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-typed-array.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-value-serializer.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/v8-wasm.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node_version.h:
../../nan/nan.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/errno.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/version.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/unix.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/threadpool.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/uv/darwin.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node_buffer.h:
/Users/uragen/Library/Caches/node-gyp/17.3.0/include/node/node_object_wrap.h:
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
