#!/bin/sh
npm run build
rm -rf ../../fullstack_osa3/fullstack_3_backend/build
cp -r build ../../fullstack_osa3/fullstack_3_backend/