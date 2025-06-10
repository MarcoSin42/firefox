// This file is loaded into the browser window scope.
/* eslint-env mozilla/browser-window */

// -*- tab-width: 2; indent-tabs-mode: nil; js-indent-level: 2 -*-

/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/**
 * A small utility program for renaming windows.
 */
const lazy = {};
ChromeUtils.defineESModuleGetters(lazy, {
  PromptUtils: "resource://gre/modules/PromptUtils.sys.mjs",
  SessionStore: "resource:///modules/sessionstore/SessionStore.sys.mjs",
});

export const RenameWindowUtils = {
  openRenamePrompt(window) {
    let aWindow = window;
    let oldTitle = lazy.SessionStore.getCustomWindowValue(aWindow, "customTitle");
    console.log("Previously set title: " + oldTitle);
    // Object for checkbox state to pass by reference.
    let check = { value: false };
    let newTitle = {};
    let userinput = {};

    if (!aWindow)
      console.log("NULLED NAME");

    let confirmed = Services.prompt.prompt(
      null, // Dom window
      "Rename window", // Title
      "New window title:", // Text
      newTitle, // Value - contains new title
      null, // Check Label
      userinput
    );
    lazy.SessionStore.setCustomWindowValue(aWindow, "customTitle", newTitle.value);
    oldTitle = lazy.SessionStore.getCustomWindowValue(aWindow, "customTitle");
    console.log("Set title: " + oldTitle);
    if (confirmed)
      console.log(newTitle);
  }
}
