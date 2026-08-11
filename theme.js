/* Night mode, shared by every page. Load this synchronously in <head> so
   the theme lands before first paint and night never flashes cream. */
(function () {
  "use strict";

  try {
    if (localStorage.getItem("amrad-theme") === "night") {
      document.documentElement.setAttribute("data-theme", "night");
    }
  } catch (e) {}

  function init() {
    var btn = document.getElementById("night-toggle");
    if (!btn) return;
    var root = document.documentElement;
    var on = root.getAttribute("data-theme") === "night";
    btn.setAttribute("aria-pressed", String(on));
    btn.addEventListener("click", function () {
      on = !on;
      if (on) root.setAttribute("data-theme", "night");
      else root.removeAttribute("data-theme");
      btn.setAttribute("aria-pressed", String(on));
      try { localStorage.setItem("amrad-theme", on ? "night" : "day"); } catch (e) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
