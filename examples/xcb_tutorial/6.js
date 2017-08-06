// https://www.x.org/releases/current/doc/libxcb/tutorial/index.html#openconn

//#include <xcb/xcb.h>
//
//int
//main ()
//{
//  xcb_connection_t *c;
//
//  /* Open the connection to the X server. Use the DISPLAY environment variable as the default display name */
//  c = xcb_connect (NULL, NULL);
//
//  return 0;
//}

"use strict";

const xcb = require("../../xcb.js");

const main = async () => {
  /* Open the connection to the X server. Use the DISPLAY environment variable as the default display name */
  const c = await xcb.connect (null, null);
};

main();
