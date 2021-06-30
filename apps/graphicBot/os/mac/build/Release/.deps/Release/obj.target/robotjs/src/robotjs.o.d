cmd_Release/obj.target/robotjs/src/robotjs.o := c++ -o Release/obj.target/robotjs/src/robotjs.o ../src/robotjs.cc '-DNODE_GYP_MODULE_NAME=robotjs' '-DUSING_UV_SHARED=1' '-DUSING_V8_SHARED=1' '-DV8_DEPRECATION_WARNINGS=1' '-DV8_DEPRECATION_WARNINGS' '-DV8_IMMINENT_DEPRECATION_WARNINGS' '-D_DARWIN_USE_64_BIT_INODE=1' '-D_LARGEFILE_SOURCE' '-D_FILE_OFFSET_BITS=64' '-DOPENSSL_NO_PINSHARED' '-DOPENSSL_THREADS' '-DBUILDING_NODE_EXTENSION' -I/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node -I/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/src -I/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/deps/openssl/config -I/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/deps/openssl/openssl/include -I/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/deps/uv/include -I/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/deps/zlib -I/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/deps/v8/include -I../../nan -I../System/Library/Frameworks/CoreFoundation.Framework/Headers -I../System/Library/Frameworks/Carbon.Framework/Headers -I../System/Library/Frameworks/ApplicationServices.framework/Headers -I../System/Library/Frameworks/OpenGL.framework/Headers  -O3 -gdwarf-2 -mmacosx-version-min=10.13 -arch x86_64 -Wall -Wendif-labels -W -Wno-unused-parameter -std=gnu++1y -stdlib=libc++ -fno-rtti -fno-exceptions -fno-strict-aliasing -MMD -MF ./Release/.deps/Release/obj.target/robotjs/src/robotjs.o.d.raw   -c
Release/obj.target/robotjs/src/robotjs.o: ../src/robotjs.cc \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/cppgc/common.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8config.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8-internal.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8-version.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8-platform.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node_version.h \
  ../../nan/nan.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/errno.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/version.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/unix.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/threadpool.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/darwin.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node_buffer.h \
  /Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node_object_wrap.h \
  ../../nan/nan_callbacks.h ../../nan/nan_callbacks_12_inl.h \
  ../../nan/nan_maybe_43_inl.h ../../nan/nan_converters.h \
  ../../nan/nan_converters_43_inl.h ../../nan/nan_new.h \
  ../../nan/nan_implementation_12_inl.h \
  ../../nan/nan_persistent_12_inl.h ../../nan/nan_weak.h \
  ../../nan/nan_object_wrap.h ../../nan/nan_private.h \
  ../../nan/nan_typedarray_contents.h ../../nan/nan_json.h \
  ../src/mouse.h ../src/os.h ../src/types.h ../src/inline_keywords.h \
  ../src/deadbeef_rand.h ../src/keypress.h ../src/keycode.h \
  ../src/screen.h ../src/screengrab.h ../src/MMBitmap.h ../src/rgb.h \
  ../src/snprintf.h ../src/microsleep.h
../src/robotjs.cc:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/cppgc/common.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8config.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8-internal.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8-version.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/v8-platform.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node_version.h:
../../nan/nan.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/errno.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/version.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/unix.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/threadpool.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/uv/darwin.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node_buffer.h:
/Users/baechang-gyu/Library/Caches/node-gyp/14.15.1/include/node/node_object_wrap.h:
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
