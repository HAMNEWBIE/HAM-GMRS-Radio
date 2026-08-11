/* Net operator tools: embed snippet, link copying, QR codes, claim checks. */
(function () {
  "use strict";

  var LABELS = {
    ham: "Ham net",
    gmrs: "GMRS net",
    wx: "SKYWARN / weather net",
    skills: "Ham skills challenge"
  };

  var statusEl = document.getElementById("status");
  var deckSelect = document.getElementById("ops-deck");

  function updateSnippet() {
    var code = document.getElementById("embed-code");
    code.textContent = code.textContent.replace(/deck=[a-z]+/, "deck=" + deckSelect.value);
  }

  deckSelect.addEventListener("change", updateSnippet);

  document.getElementById("copy-embed").addEventListener("click", function () {
    var code = document.getElementById("embed-code").textContent;
    navigator.clipboard.writeText(code).then(function () {
      statusEl.textContent = "Embed code copied (" + LABELS[deckSelect.value] + ").";
    }, function () {
      statusEl.textContent = "Copy failed. Select the code and copy it manually.";
    });
  });

  document.getElementById("copy-script").addEventListener("click", function () {
    var text = document.getElementById("net-script").innerText;
    navigator.clipboard.writeText(text).then(function () {
      statusEl.textContent = "Script copied. Fill in the bracketed parts before the net.";
    }, function () {
      statusEl.textContent = "Copy failed. Select the script text and copy it manually.";
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll(".btn-copylink:not(.btn-qr)"), function (btn) {
    btn.addEventListener("click", function () {
      var url = btn.getAttribute("data-copy");
      navigator.clipboard.writeText(url).then(function () {
        statusEl.textContent = "Link copied: " + url;
      }, function () {
        statusEl.textContent = "Copy failed. Select the link text and copy it manually.";
      });
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll(".btn-qr"), function (btn) {
    btn.addEventListener("click", function () {
      var li = btn.closest("li");
      var existing = li.querySelector(".qr-pop");
      if (existing) {
        existing.remove();
        btn.setAttribute("aria-expanded", "false");
        return;
      }
      var url = btn.getAttribute("data-qr");
      var pop = document.createElement("figure");
      pop.className = "qr-pop";
      var img = document.createElement("img");
      img.width = 220;
      img.height = 220;
      img.alt = "QR code for " + url;
      img.src = "https://api.qrserver.com/v1/create-qr-code/?size=440x440&format=png&data=" + encodeURIComponent(url);
      var cap = document.createElement("figcaption");
      cap.textContent = url;
      var hint = document.createElement("span");
      hint.className = "qr-hint";
      hint.textContent = "Right-click or long-press the code to save it for a flyer.";
      pop.appendChild(img);
      pop.appendChild(cap);
      pop.appendChild(hint);
      li.appendChild(pop);
      btn.setAttribute("aria-expanded", "true");
    });
  });

  /* Claim verification: a live link can't be popup-blocked */
  var verifyInput = document.getElementById("verify-seed");
  var verifyOpen = document.getElementById("verify-open");

  function verifySeed() {
    var n = parseInt(verifyInput.value.replace(/\D/g, ""), 10);
    return n > 0 ? n : 0;
  }

  function updateVerifyLink() {
    var n = verifySeed();
    if (n) {
      verifyOpen.href = "bingo.html?deck=" + deckSelect.value + "&seed=" + n;
    } else {
      verifyOpen.removeAttribute("href");
    }
  }

  verifyInput.addEventListener("input", updateVerifyLink);
  deckSelect.addEventListener("change", updateVerifyLink);

  verifyOpen.addEventListener("click", function (e) {
    if (!verifySeed()) {
      e.preventDefault();
      statusEl.textContent = "Enter the card number exactly as the claimant read it.";
      verifyInput.focus();
      return;
    }
    statusEl.textContent = "Opened card " + verifySeed() + " (" + LABELS[deckSelect.value] + ") in a new tab.";
  });

  document.getElementById("verify-form").addEventListener("submit", function (e) {
    e.preventDefault();
    verifyOpen.click();
  });
})();
