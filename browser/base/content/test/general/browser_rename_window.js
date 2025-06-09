/* Any copyright is dedicated to the Public Domain.
 * http://creativecommons.org/publicdomain/zero/1.0/ */

add_task(async function test_rename_window() {
  // Test UI: Check if "Rename Window..." menu item exists
  let contextMenu = document.getElementById("tabContextMenu");
  ok(contextMenu, "Tab context menu should exist");

  let renameItem = document.getElementById("renameWindowContextMenuItem");
  ok(renameItem, "Rename Window menu item should exist");

  // Test renaming logic
  let originalTitle = window.document.title;
  let newName = "My Custom Window Name";

  // Mock Services.prompt.promptPasswordBC to simulate user input
  let oldPromptPasswordBC = Services.prompt.promptPasswordBC;
  Services.prompt.promptPasswordBC = function (parent, title, text, value, checkMsg, checkValue) {
    value.value = newName;
    return true; // Simulate OK button click
  };

  // Simulate clicking the "Rename Window..." menu item
  renameItem.click();

  // Check if window title is updated
  is(document.documentElement.getAttribute("customTitle"), newName, "Window title should be updated to the new name");

  // Check if gBrowser._windowRenames is updated
  ok(gBrowser._windowRenames, "gBrowser._windowRenames should exist");
  is(gBrowser._windowRenames[gBrowser.permanentKey], newName, "gBrowser._windowRenames should store the new name");

  // Restore original Services.prompt.promptPasswordBC
  Services.prompt.promptPasswordBC = oldPromptPasswordBC;

  // Test session persistence (simplified for mochitest)
  // Simulate closing and reopening the window by checking SessionStore data
  let windowState = JSON.parse(SessionStore.getCustomWindowState(window));
  is(windowState.customTitle, newName, "Custom window title should be saved in session store");

  // Reset custom title for subsequent tests
  document.documentElement.removeAttribute("customTitle");
  delete gBrowser._windowRenames[gBrowser.permanentKey];
  SessionStore.setCustomWindowState();
});
