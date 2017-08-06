// https://www.x.org/releases/current/doc/libxcb/tutorial/index.html#helloworld

//#include <unistd.h>      /* pause() */
//
//#include <xcb/xcb.h>
//
//int
//main ()
//{
//  xcb_connection_t *c;
//  xcb_screen_t     *screen;
//  xcb_window_t      win;
//
//  /* Open the connection to the X server */
//  c = xcb_connect (NULL, NULL);
//
//  /* Get the first screen */
//  screen = xcb_setup_roots_iterator (xcb_get_setup (c)).data;
//
//  /* Ask for our window's Id */
//  win = xcb_generate_id(c);
//
//  /* Create the window */
//  xcb_create_window (c,                             /* Connection          */
//                     XCB_COPY_FROM_PARENT,          /* depth (same as root)*/
//                     win,                           /* window Id           */
//                     screen->root,                  /* parent window       */
//                     0, 0,                          /* x, y                */
//                     150, 150,                      /* width, height       */
//                     10,                            /* border_width        */
//                     XCB_WINDOW_CLASS_INPUT_OUTPUT, /* class               */
//                     screen->root_visual,           /* visual              */
//                     0, NULL);                      /* masks, not used yet */
//
//  /* Map the window on the screen */
//  xcb_map_window (c, win);
//
//  /* Make sure commands are sent before we pause, so window is shown */
//  xcb_flush (c);
//
//  pause ();    /* hold client until Ctrl-C */
//
//  return 0;
//}

"use strict";

const ref = require("ref");
const xcb = require("../../xcb.js");

/* Open the connection to the X server */
const c = xcb.connect (null, null);

/* Get the first screen */
const screen = xcb.setup_roots_iterator (xcb.get_setup (c)).data;

/* Ask for our window's Id */
const win = xcb.generate_id(c);

/* Create the window */
xcb.create_window (c,                             /* Connection          */
                   xcb.COPY_FROM_PARENT,          /* depth (same as root)*/
                   win,                           /* window Id           */
                   screen.deref().root,           /* parent window       */
                   0, 0,                          /* x, y                */
                   150, 150,                      /* width, height       */
                   10,                            /* border_width        */
                   xcb.WINDOW_CLASS_INPUT_OUTPUT, /* class               */
                   screen.deref().root_visual,    /* visual              */
                   0, null);                      /* masks, not used yet */

/* Map the window on the screen */
xcb.map_window (c, win);

/* Make sure commands are sent before we pause, so window is shown */
xcb.flush (c);

setTimeout(() => {}, 1000*60*60);    /* hold client until Ctrl-C */
