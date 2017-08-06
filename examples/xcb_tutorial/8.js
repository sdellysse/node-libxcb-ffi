"use strict";

const ref = require("ref");
const xcb = require("../../raw.js");

const c = xcb.xcb_connect(null, null);

const screen = xcb.xcb_setup_roots_iterator(xcb.xcb_get_setup(c)).data;
const win = xcb.xcb_generate_id(c);

xcb.xcb_create_window(
  c,
  xcb.XCB_COPY_FROM_PARENT,
  win,
  screen.deref().root,
  0, 0,
  150, 150,
  10,
  xcb.XCB_WINDOW_CLASS_INPUT_OUTPUT,
  screen.deref().root_visual,
  0, null
);

xcb.xcb_map_window(c, win);

xcb.xcb_flush(c);
setTimeout(() => {}, 1000);
