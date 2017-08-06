"use strict";

const ffi       = require("ffi");
const ref       = require("ref");
const struct = require("ref-struct");

const p = exports.p = (type) => ref.refType(type);

exports.xcb_colormap_t = ref.types.uint32;
exports.xcb_keycode_t  = ref.types.uint8;
exports.xcb_visualid_t = ref.types.uint32;
exports.xcb_window_t   = ref.types.uint32;
exports.xcb_window_class_t = ref.types.uint32;

exports.XCB_COPY_FROM_PARENT = ref.alloc(ref.types.uint32, 0);
exports.XCB_WINDOW_CLASS_INPUT_OUTPUT = ref.alloc(exports.xcb_window_class_t, 0x01);

exports.xcb_void_cookie_t = struct({
  sequence: ref.types.uint,
});

exports.xcb_screen_t = struct({
  root:                   exports.xcb_window_t,
  default_colormap:       exports.xcb_colormap_t,
  white_pixel:            ref.types.uint32,
  black_pixel:            ref.types.uint32,
  current_input_masks:    ref.types.uint32,
  width_in_pixels:        ref.types.uint16,
  height_in_pixels:       ref.types.uint16,
  width_in_millimeters:   ref.types.uint16,
  height_in_millimeters:  ref.types.uint16,
  min_installed_maps:     ref.types.uint16,
  max_installed_maps:     ref.types.uint16,
  root_visual:            exports.xcb_visualid_t,
  backing_stores:         ref.types.uint8,
  save_unders:            ref.types.uint8,
  root_depth:             ref.types.uint8,
  allowed_depths_len:     ref.types.uint8,
});

exports.xcb_screen_iterator_t = struct({
  data:  p(exports.xcb_screen_t),
  rem:   ref.types.int,
  index: ref.types.int,
});

exports.xcb_setup_t = struct({
  status:                       ref.types.uint8,
  pad0:                         ref.types.uint8,
  protocol_major_version:       ref.types.uint16,
  protocol_minor_version:       ref.types.uint16,
  length:                       ref.types.uint16,
  release_number:               ref.types.uint32,
  resource_id_base:             ref.types.uint32,
  resource_id_mask:             ref.types.uint32,
  motion_buffer_size:           ref.types.uint32,
  vendor_len:                   ref.types.uint16,
  maximum_request_length:       ref.types.uint16,
  roots_len:                    ref.types.uint8,
  pixmap_formats_len:           ref.types.uint8,
  image_byte_order:             ref.types.uint8,
  bitmap_format_bit_order:      ref.types.uint8,
  bitmap_format_scanline_unit:  ref.types.uint8,
  bitmap_format_scanline_pad:   ref.types.uint8,
  min_keycode:                  exports.xcb_keycode_t,
  max_keycode:                  exports.xcb_keycode_t,
});

exports.xcb_connection_t = ref.types.void;

Object.assign(exports, ffi.Library("libxcb", {
  xcb_connect: [ p(exports.xcb_connection_t), [ p(ref.types.CString), p(ref.types.int) ] ],
  xcb_create_window: [ exports.xcb_void_cookie_t, [
    p(exports.xcb_connection_t), /* c */
    ref.types.uint8, /* depth */
    exports.xcb_window_t, /* wid */
    exports.xcb_window_t, /* parent */
    ref.types.int16, /* x */
    ref.types.int16, /* y */
    ref.types.uint16, /* width */
    ref.types.uint16, /* height */
    ref.types.uint16, /* border_width */
    ref.types.uint16, /* class */
    exports.xcb_visualid_t, /* visual */
    ref.types.uint32, /*value_mask */
    p(ref.types.uint32), /* value_list */
  ]],
  xcb_disconnect: [ ref.types.void, [ p(exports.xcb_connection_t) ] ],
  xcb_flush: [ ref.types.int, [ p(exports.xcb_connection_t) ] ],
  xcb_generate_id: [ exports.xcb_window_t, [ p(exports.xcb_connection_t) ] ],
  xcb_get_setup: [ p(exports.xcb_setup_t), [ p(exports.xcb_connection_t) ] ],
  xcb_map_window: [ p(exports.xcb_void_cookie_t), [
    p(exports.xcb_connection_t), /* c */
    exports.xcb_window_t, /* window */
  ]],
  xcb_screen_next: [ ref.types.void, [ p(exports.xcb_screen_iterator_t) ] ],
  xcb_setup_roots_iterator: [ exports.xcb_screen_iterator_t, [ p(exports.xcb_setup_t) ] ],
}));
