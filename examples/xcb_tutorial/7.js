// https://www.x.org/releases/current/doc/libxcb/tutorial/index.html#screen
"use strict";

const ref = require("ref");
const xcb = require("../../raw.js");

const screenNumRef = ref.alloc(ref.types.int);
const c = xcb.xcb_connect(null, screenNumRef);
let screenNumber = screenNumRef.deref();

const iter = xcb.xcb_setup_roots_iterator(xcb.xcb_get_setup(c));
let screen;
for (; iter.rem; --screenNumber, xcb.xcb_screen_next(ref.refType(iter))) {
  if (screenNumber === 0) {
    screen = iter.data;
    break;
  }
}

console.log(`
Informations of screen ${ screen.deref().root }:
  width.........: ${ screen.deref().width_in_pixels }
  height........: ${ screen.deref().height_in_pixels }
  white pixel...: ${ screen.deref().white_pixel }
  black pixel...: ${ screen.deref().black_pixel }
`);
