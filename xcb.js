"use strict";

const ffi       = require("ffi");
const ref       = require("ref");
const struct = require("ref-struct");

const xcb = module.exports;
const p = (type) => ref.refType(type);

xcb.colormap_t = ref.types.uint32;
xcb.keycode_t  = ref.types.uint8;
xcb.visualid_t = ref.types.uint32;
xcb.window_t   = ref.types.uint32;
xcb.window_class_t = ref.types.uint32;

xcb.COPY_FROM_PARENT = ref.alloc(ref.types.uint32, 0);
xcb.WINDOW_CLASS_INPUT_OUTPUT = ref.alloc(xcb.window_class_t, 0x01);

xcb.void_cookie_t = struct({
  sequence: ref.types.uint,
});

xcb.screen_t = struct({
  root:                   xcb.window_t,
  default_colormap:       xcb.colormap_t,
  white_pixel:            ref.types.uint32,
  black_pixel:            ref.types.uint32,
  current_input_masks:    ref.types.uint32,
  width_in_pixels:        ref.types.uint16,
  height_in_pixels:       ref.types.uint16,
  width_in_millimeters:   ref.types.uint16,
  height_in_millimeters:  ref.types.uint16,
  min_installed_maps:     ref.types.uint16,
  max_installed_maps:     ref.types.uint16,
  root_visual:            xcb.visualid_t,
  backing_stores:         ref.types.uint8,
  save_unders:            ref.types.uint8,
  root_depth:             ref.types.uint8,
  allowed_depths_len:     ref.types.uint8,
});

xcb.screen_iterator_t = struct({
  data:  p(xcb.screen_t),
  rem:   ref.types.int,
  index: ref.types.int,
});

xcb.setup_t = struct({
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
  min_keycode:                  xcb.keycode_t,
  max_keycode:                  xcb.keycode_t,
});

xcb.connection_t = ref.types.void;

const defs = {
  xcb_connect: {
    returns: p(xcb.connection_t),
    params: [
      {displayname: p(ref.types.CString)},
      {screenp:     p(ref.types.int)    },
    ],
  },

  xcb_create_window: {
    returns: xcb.void_cookie_t,
    params: [
      {c:            p(xcb.connection_t)},
      {depth:        ref.types.uint8},
      {wid:          xcb.window_t},
      {parent:       xcb.window_t},
      {x:            ref.types.int16},
      {y:            ref.types.int16},
      {width:        ref.types.uint16},
      {height:       ref.types.uint16},
      {border_width: ref.types.uint16},
      {class:        ref.types.uint16},
      {visual:       xcb.visualid_t},
      {value_mask:   ref.types.uint32},
      {value_list:   p(ref.types.uint32)},
    ],
  },

  xcb_disconnect: {
    returns: ref.types.void,
    params: [
      {c: xcb.connection_t},
    ],
  },

  xcb_flush: {
    name: "xcb_flush",
    returns: ref.types.int,
    params: [
      {c: p(xcb.connection_t)},
    ],
  },

  xcb_generate_id: {
    returns: xcb.window_t,
    params: [
      {c: p(xcb.connection_t)},
    ],
  },

  xcb_get_setup: {
    returns: p(xcb.setup_t),
    params: [
      {c: p(xcb.connection_t)},
    ],
  },

  xcb_map_window: {
    returns: p(xcb.void_cookie_t),
    params:[
      {c:      p(xcb.connection_t)},
      {window: xcb.window_t},
    ],
  },

  xcb_screen_next: {
    returns: ref.types.void,
    params: [
      {iter: p(xcb.screen_iterator_t)},
    ],
  },

  xcb_setup_roots_iterator: {
    returns: xcb.screen_iterator_t,
    params: [
      {param0: p(xcb.setup_t)},
    ],
  },
};

const ffiArgs = {};
for (const [ name, { returns, params } ] of Object.entries(defs)) {
  ffiArgs[name] = [returns, params.map(p => Object.values(p)[0])];
}

for (const [name, fn] of Object.entries(ffi.Library("libxcb", ffiArgs))) {
  xcb[name.replace(/^xcb_/, "")] = fn;
}
