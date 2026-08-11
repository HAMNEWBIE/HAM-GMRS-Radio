/* Net Bingo: seeded random cards, online marking, print, PNG download. */
(function () {
  "use strict";

  var DECKS = {
    ham: {
      label: "Ham net",
      free: "FREE\n“73!”",
      house: "House rules: claim your bingo after the net closes, never during check-ins. Etiquette lesson free with every square.",
      squares: [
        "Doubles, apologizes, immediately doubles again",
        "Kerchunk. Silence. We all know who it was.",
        "Open mic broadcasts someone's TV",
        "Timeout timer wins the argument",
        "Roger beep from the guy asked twice to disable it",
        "Static crash eats the punchline",
        "“Repeat your call?” ×3 — still wrong",
        "Battery dies mid-word; returns 10 min later to finish the sentence",
        "“You're picket-fencing” — moves 3 feet, cured",
        "“Can everyone hear me?” — silence",
        "Link delay clips the first word of every single over",
        "Echo-test guy is testing the echo. Again.",
        "Five straight “no traffic” (so... why are we here)",
        "“Any late check-ins?” summons three lurkers",
        "Check-in covers name, wx, lawn status, and knee surgery",
        "“King Nine” phonetics offender",
        "New ham's first check-in — applause pileup 🎉",
        "Net control loses the list, starts over from A",
        "EchoLink guy from Florida just wanted to say hi",
        "The 73 pileup runs longer than the net",
        "Mobile check-in drives into a dead zone mid-word",
        "“QSL QSL” — on an FM voice net",
        "Antenna story involves a ladder and a near-death experience",
        "HOA rant reaches minute three",
        "Detailed report on weather that already happened",
        "Swap & shop: radio older than the seller",
        "“I'm on a Baofeng” — audible sigh",
        "Recruiting pitch delivered to the already-licensed",
        "Dog checks in before the operator does",
        "“Sorry — dinner” (clearly mid-chew)",
        "Elmer explains SWR for the 40th time, still kind",
        "“Back in my day” story predates the repeater",
        "Unprompted praise for repeater owner (tower bill due?)",
        "Question actually solved — stunned silence",
        "Signal report is “59”, then asks for everything repeated",
        "Tech question gets four answers at once, all different",
        "“I'll take it offline” (it is never taken offline)",
        "Someone tunes up right on top of the net",
        "“Is the repeater down?” asked on the repeater",
        "Net control blanks on their own callsign for a beat",
        "Wind noise: the mobile has a window down and a story to tell",
        "“You're coming in broken” (full conversation proceeds anyway)",
        "“Quick comment” enters minute four",
        "New HT arrives with every keypad beep enabled",
        "The 10-minute ID lands at 9:59, and he's proud of it",
        "Announcement for an event that happened last Saturday",
        "Ragchew continues 30 seconds after “let's clear the frequency”",
        "Solar report delivered to a net that never touches HF"
      ]
    },
    gmrs: {
      label: "GMRS net",
      free: "FREE\n“Copy that.”",
      house: "House rules: claim your bingo after the net closes. “CB lingo heard” may not be self-triggered.",
      squares: [
        "“10-4” (CB habits die hard)",
        "“Breaker breaker” on a GMRS net",
        "Kid grabs the radio, whole net says hi",
        "“Do I even need a license?” (yes)",
        "Roger beep chorus: every radio still has it on",
        "Blister-pack FRS radio joins from the toy aisle",
        "“What's your 20?” He's in his driveway. Again.",
        "Wrong tone: repeater hears him, he hears nothing",
        "Midland vs Wouxun debate, round 14",
        "“I bought it for emergencies” (checks in daily)",
        "Whole family checks in from the same kitchen",
        "Linked-repeater delay causes a triple",
        "Callsign read like a phone number",
        "Neighborhood watch report: nothing happened",
        "“Can you hear me now?” walks the whole house",
        "Someone keys up from the lawnmower",
        "New member reads their callsign wrong, twice",
        "Weather report from a Costco weather station",
        "“My kids never use it” (kids audible on channel 2)",
        "Repeater owner gently mentions the power bill",
        "Open mic during dinner, full menu recovered",
        "Prepper gear inventory reaches minute five",
        "Simplex test: nobody can hear anybody",
        "Ham guy checks in, mentions he's also a ham",
        "Range brag: “40 miles!” (from a hilltop, once)",
        "Asks for the repeater tone, third week running",
        "“Over and out” (pick one)",
        "Echo test on the linked system. Again.",
        "Mobile flutter through the entire check-in",
        "“Copy that, copy that”",
        "“Beats them cell phones” (heard via speakerphone)",
        "Attic antenna installed; HOA remains unaware, undefeated",
        "Radio check request answered by six people at once",
        "“Loud and clear” (nobody asked)",
        "A radio loudly announces its own menu settings mid-net",
        "Grandkid delivers the cuteness check-in, net melts",
        "“We should do this weekly” (this is the weekly net)",
        "Garage door opener blamed for interference. Again.",
        "Basement signal test: heroic, doomed",
        "“Just monitoring” guy accidentally keys up",
        "New antenna ordered; range brag updated in advance",
        "Dog barks at the roger beep. Every time.",
        "Channel 19 trucker talk cited. That's CB. He knows."
      ]
    },
    wx: {
      label: "SKYWARN / weather net",
      free: "FREE\nStay weather aware",
      house: "House rules: real reports outrank bingo. An actual activation suspends play immediately.",
      squares: [
        "“Ping-pong-ball hail” (it was pea gravel)",
        "Rotation reported; it's a plastic bag",
        "Net activates; sky immediately clears",
        "Rain report filed from behind a window",
        "Wall cloud vs shelf cloud debate",
        "NWS asks for measured wind; everyone estimates anyway",
        "“Trees swaying pretty good” (unmeasured, unverified)",
        "Storm reported from the TV, not the sky",
        "Chaser checks in from three counties away",
        "Power flickers; entire net says “ooh” at once",
        "Generator guy mentions the generator",
        "Hail size described only in food items",
        "“Funnel!” It's scud. It's always scud.",
        "Rain gauge read to two decimal places",
        "Siren audible inside someone's transmission",
        "Silence during the net; five reports after it closes",
        "“It's really coming down” (no location given)",
        "Location given as “my house”",
        "Barometer trivia hour begins",
        "A relay of a relay of a report",
        "Mobile spotter clearly driving toward the storm",
        "“Golf ball hail” photo shows a marble",
        "Weather-radio alarm goes off mid-transmission",
        "Lightning takes out the repeater. Briefly.",
        "Net closes; storm re-forms immediately",
        "“Back edge of the storm” called four times",
        "Wind estimate exceeds the hurricane scale",
        "Dew point small talk",
        "Spotter training quoted chapter and verse",
        "“Is the net still active?” It is not.",
        "“It's headed right for us” (it is not)",
        "Radar screenshot described aloud, pixel by pixel",
        "Sunshine reported, sternly",
        "Two spotters report the same cloud, disagree completely",
        "“Take cover” advice from a man outside filming it",
        "“My knee says storm” briefly outranks the radar",
        "Net control asks for a county, receives a life story",
        "Hail compared to a fruit nobody has ever bought",
        "“Back in the derecho of...” is spoken",
        "Rain total disputed by a neighbor two doors down",
        "Storm misses the county; net quietly takes credit",
        "Graupel is correctly identified. Nobody believes it.",
        "Anemometer purchased mid-net"
      ]
    }
  };

  var FREE_INDEX = 12;
  var grid = document.getElementById("grid");
  var deckSelect = document.getElementById("deck");
  var statusEl = document.getElementById("status");
  var banner = document.getElementById("bingo-banner");
  var cardIdEl = document.getElementById("card-id");
  var deckLabelEl = document.getElementById("deck-label");
  var houseEl = document.getElementById("house-rules");

  var state = { deck: "ham", seed: 0, cells: [], marks: [] };

  /* Small seeded PRNG so a card can be shared by URL. */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function sample(list, n, rng) {
    var pool = list.slice();
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    return pool.slice(0, n);
  }

  function newSeed() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  function buildCard(deckKey, seed) {
    var deck = DECKS[deckKey];
    var rng = mulberry32(seed);
    var cells = sample(deck.squares, 24, rng);
    cells.splice(FREE_INDEX, 0, deck.free);
    state.deck = deckKey;
    state.seed = seed;
    state.cells = cells;
    state.marks = cells.map(function (_, i) { return i === FREE_INDEX; });
    render();
    var url = new URL(window.location.href);
    url.searchParams.set("deck", deckKey);
    url.searchParams.set("seed", String(seed));
    history.replaceState(null, "", url.toString());
  }

  function render() {
    var deck = DECKS[state.deck];
    deckSelect.value = state.deck;
    deckLabelEl.textContent = deck.label;
    cardIdEl.textContent = String(state.seed);
    houseEl.textContent = deck.house;
    banner.hidden = true;
    grid.textContent = "";

    state.cells.forEach(function (text, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "cell" + (i === FREE_INDEX ? " cell-free" : "");
      btn.setAttribute("aria-pressed", state.marks[i] ? "true" : "false");
      btn.dataset.index = String(i);

      var phrase = document.createElement("span");
      phrase.className = "cell-text";
      phrase.textContent = text.replace("\n", " ");
      btn.appendChild(phrase);

      var pos = document.createElement("span");
      pos.className = "visually-hidden";
      pos.textContent = i === FREE_INDEX
        ? ", free space, already marked"
        : ", row " + (Math.floor(i / 5) + 1) + ", column " + ((i % 5) + 1);
      btn.appendChild(pos);

      btn.addEventListener("click", function () { toggle(i); });
      grid.appendChild(btn);
    });
  }

  function toggle(i) {
    if (i === FREE_INDEX) return;
    state.marks[i] = !state.marks[i];
    var btn = grid.children[i];
    btn.setAttribute("aria-pressed", state.marks[i] ? "true" : "false");
    checkBingo();
  }

  function checkBingo() {
    var m = state.marks;
    var lines = [];
    for (var r = 0; r < 5; r++) lines.push([r * 5, r * 5 + 1, r * 5 + 2, r * 5 + 3, r * 5 + 4]);
    for (var c = 0; c < 5; c++) lines.push([c, c + 5, c + 10, c + 15, c + 20]);
    lines.push([0, 6, 12, 18, 24]);
    lines.push([4, 8, 12, 16, 20]);

    var won = lines.some(function (line) {
      return line.every(function (i) { return m[i]; });
    });

    banner.hidden = !won;
    var count = m.filter(Boolean).length - 1;
    statusEl.textContent = won
      ? "BINGO! Five in a row. " + count + " squares marked."
      : count + (count === 1 ? " square" : " squares") + " marked.";
  }

  /* PNG download: draw the current card on a canvas at print resolution. */
  function wrapText(ctx, text, maxWidth) {
    var words = text.split(" ");
    var lines = [];
    var line = "";
    words.forEach(function (w) {
      var test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = w;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines;
  }

  function downloadPNG() {
    var W = 1275, H = 1650;
    var canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    var ctx = canvas.getContext("2d");
    var deck = DECKS[state.deck];

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = "#10130c";
    ctx.fillRect(0, 0, W, 150);
    ctx.fillStyle = "#ffb000";
    ctx.font = "600 58px 'IBM Plex Mono', monospace";
    ctx.textAlign = "center";
    ctx.fillText("N E T   B I N G O", W / 2, 78);
    ctx.font = "400 26px 'IBM Plex Mono', monospace";
    ctx.fillStyle = "rgba(255,176,0,0.65)";
    ctx.fillText(deck.label + "  ·  card " + state.seed + "  ·  five in a row wins", W / 2, 122);

    var M = 60, TOP = 210, SIZE = (W - 2 * M) / 5, RH = 220;
    ctx.fillStyle = "#55604b";
    ctx.font = "700 40px 'Barlow Condensed', sans-serif";
    "RADIO".split("").forEach(function (ch, i) {
      ctx.fillText(ch, M + SIZE * i + SIZE / 2, TOP - 18);
    });

    state.cells.forEach(function (text, i) {
      var r = Math.floor(i / 5), c = i % 5;
      var x = M + SIZE * c, y = TOP + RH * r;
      var marked = state.marks[i];
      var free = i === FREE_INDEX;

      ctx.fillStyle = free ? "#fdf3e0" : marked ? "#fbe3d6" : "#ffffff";
      ctx.fillRect(x, y, SIZE, RH);
      ctx.strokeStyle = "#171b16";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, SIZE, RH);

      ctx.fillStyle = "#171b16";
      var fs = free ? 30 : 24;
      ctx.font = (free ? "600 " : "400 ") + fs + "px Barlow, sans-serif";
      var lines = [];
      text.split("\n").forEach(function (part) {
        lines = lines.concat(wrapText(ctx, part, SIZE - 26));
      });
      while (lines.length * (fs + 6) > RH - 20 && fs > 15) {
        fs -= 1;
        ctx.font = "400 " + fs + "px Barlow, sans-serif";
        lines = [];
        text.split("\n").forEach(function (part) {
          lines = lines.concat(wrapText(ctx, part, SIZE - 26));
        });
      }
      var lh = fs + 6;
      var ty = y + RH / 2 - (lines.length - 1) * lh / 2 + fs / 3;
      lines.forEach(function (ln) {
        ctx.fillText(ln, x + SIZE / 2, ty);
        ty += lh;
      });

      if (marked && !free) {
        ctx.strokeStyle = "rgba(225,78,14,0.75)";
        ctx.lineWidth = 8;
        ctx.beginPath();
        ctx.moveTo(x + 22, y + 22);
        ctx.lineTo(x + SIZE - 22, y + RH - 22);
        ctx.moveTo(x + SIZE - 22, y + 22);
        ctx.lineTo(x + 22, y + RH - 22);
        ctx.stroke();
      }
    });

    ctx.fillStyle = "#55604b";
    ctx.font = "italic 22px Barlow, sans-serif";
    var footY = TOP + RH * 5 + 60;
    wrapText(ctx, deck.house, W - 2 * M).forEach(function (ln) {
      ctx.fillText(ln, W / 2, footY);
      footY += 28;
    });

    var a = document.createElement("a");
    a.download = "Net_Bingo_" + state.deck + "_" + state.seed + ".png";
    a.href = canvas.toDataURL("image/png");
    a.click();
    statusEl.textContent = "Card downloaded as " + a.download;
  }

  /* Wire up controls */
  document.getElementById("new-card").addEventListener("click", function () {
    buildCard(deckSelect.value, newSeed());
    statusEl.textContent = "New card dealt.";
  });

  deckSelect.addEventListener("change", function () {
    buildCard(deckSelect.value, newSeed());
    statusEl.textContent = "New " + DECKS[deckSelect.value].label + " card dealt.";
  });

  document.getElementById("print-card").addEventListener("click", function () {
    window.print();
  });

  document.getElementById("download-card").addEventListener("click", downloadPNG);

  document.getElementById("clear-marks").addEventListener("click", function () {
    state.marks = state.cells.map(function (_, i) { return i === FREE_INDEX; });
    render();
    statusEl.textContent = "Marks cleared.";
  });

  document.getElementById("big-text").addEventListener("click", function () {
    var on = document.body.classList.toggle("bigtext");
    this.setAttribute("aria-pressed", on ? "true" : "false");
  });

  /* Embed snippet copy button */
  var copyBtn = document.getElementById("copy-embed");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var code = document.getElementById("embed-code").textContent;
      navigator.clipboard.writeText(code).then(function () {
        statusEl.textContent = "Embed code copied.";
      }, function () {
        statusEl.textContent = "Copy failed. Select the code and copy it manually.";
      });
    });
  }

  /* Init from URL, or deal fresh */
  var params = new URLSearchParams(window.location.search);
  if (params.get("embed") === "1") {
    document.body.classList.add("embed");
  }
  var deckParam = params.get("deck");
  var seedParam = parseInt(params.get("seed"), 10);
  buildCard(
    DECKS[deckParam] ? deckParam : "ham",
    seedParam > 0 ? seedParam : newSeed()
  );
})();
