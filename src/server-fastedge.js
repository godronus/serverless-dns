/*
 * Copyright (c) 2022 RethinkDNS and its authors.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import "./core/fastedge/config.js";
import { handleRequest } from "./core/doh.js";
import * as system from "./system.js";
import * as util from "./commons/util.js";
// import { env } from "fastly:env";

addEventListener("fetch", (event) => {
  return event.respondWith(serveDoh(event));
});

/**
 * @param {FetchEvent} event
 * @returns {Response}
 */
async function serveDoh(event) {
  // on Fastly, the network-context is only available in an event listener
  // and so, publish system prepare from here instead of from main which
  // runs in global-scope.
  system.pub("prepare");

  try {
    console.log("Farq: SYSTEM GO >>>>>>>>>>>>>>>>>>>>>>>>>>>>> ");
    await system.when("go");
    const response = await handleRequest(event);
    return response;
  } catch (e) {
    console.error("server", "serveDoh err", e);
    return util.respond405();
  }
}
