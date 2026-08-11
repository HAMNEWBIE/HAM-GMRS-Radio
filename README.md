# amrad

A simple static site for ham radio, GMRS, and mesh networking. Frequencies,
license paths, useful links, and Net Bingo.

## Pages

- `index.html`: field reference (GMRS channels, ham quick reference, mesh, links)
- `bingo.html`: Net Bingo, randomized cards of things that actually happen on
  nets, with decks for ham, GMRS, SKYWARN/weather, and a skills challenge.
  Play online, print, or download as PNG. Cards are seeded, so sharing the
  URL shares the card. Add `?embed=1` to embed just the card in an iframe.
- `netops.html`: everything for net operators: the embed snippet, per-deck
  share links and QR codes, the on-air introduction script, and the claim
  verification tool.

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
```

## Hosting

Built for GitHub Pages: plain HTML/CSS/JS, no build step. Enable Pages on the
`main` branch in the repo settings and it just works.

## Repos to know

A curated list of active GitHub projects for radio people. The live
version at [repos.html](https://wsnj234.github.io/amrad/repos.html)
shows star counts and last-push dates, refreshed every Monday by a
GitHub Action (`.github/workflows/update-repos.yml`). The same run scouts
GitHub for new candidates (300+ stars, active in the last 60 days) and
proposes them in an issue; nothing reaches the page without a hand edit
to `repos.json`.

### Program your radio

- [kk7ds/chirp](https://github.com/kk7ds/chirp): Free programming software for hundreds of radios. The CSVs on this site load straight into it.
- [hmatuschek/qdmr](https://github.com/hmatuschek/qdmr): Codeplug programming for DMR radios. The CHIRP of digital voice.

### Station and logging

- [Hamlib/Hamlib](https://github.com/Hamlib/Hamlib): The rig-control library working behind most logging and digital-mode software.
- [wavelog/wavelog](https://github.com/wavelog/wavelog): Self-hosted web logbook, the actively developed successor to Cloudlog.
- [foldynl/QLog](https://github.com/foldynl/QLog): Fast desktop logger with rig control, maps, and cluster spots.
- [km4ack/73Linux](https://github.com/km4ack/73Linux): Scripted install of a whole ham software stack on a Raspberry Pi.

### Mesh networks

- [meshcore-dev/MeshCore](https://github.com/meshcore-dev/MeshCore): The LoRa mesh this site favors: routed through designated repeaters, with room servers for group chat.
- [meshtastic/firmware](https://github.com/meshtastic/firmware): The biggest LoRa mesh community. Flood-routed, huge hardware support.
- [aredn/aredn](https://github.com/aredn/aredn): Ham-licensed high-bandwidth IP mesh firmware for off-the-shelf WiFi gear.
- [markqvist/Reticulum](https://github.com/markqvist/Reticulum): A cryptographic network stack that runs over LoRa, packet radio, or any byte pipe.

### Software-defined radio

- [AlexandreRouma/SDRPlusPlus](https://github.com/AlexandreRouma/SDRPlusPlus): Fast, clean, cross-platform SDR receiver. A great first stop for a new dongle.
- [f4exb/sdrangel](https://github.com/f4exb/sdrangel): The SDR swiss army knife: transmit and receive, dozens of demodulators.
- [gqrx-sdr/gqrx](https://github.com/gqrx-sdr/gqrx): The classic Linux and Mac SDR receiver, still going strong.
- [SatDump/SatDump](https://github.com/SatDump/SatDump): Decode weather satellites and a whole zoo of downlinks, pictures included.
- [ka9q/ka9q-radio](https://github.com/ka9q/ka9q-radio): Hundreds of simultaneous channels from one SDR, from Phil Karn KA9Q.
- [luarvique/openwebrx](https://github.com/luarvique/openwebrx): OpenWebRX+, a web SDR receiver your whole club can tune at once.

### Packet and digital voice

- [wb2osz/direwolf](https://github.com/wb2osz/direwolf): The software TNC behind most APRS igates and packet setups.
- [g4klx/MMDVM-Host](https://github.com/g4klx/MMDVM-Host): The software heart of most digital-voice hotspots.

### Fun with radio waves

- [merbanan/rtl_433](https://github.com/merbanan/rtl_433): Decode the 433 and 915 MHz chatter around you: weather stations, tire sensors, doorbells.
- [flightaware/dump1090](https://github.com/flightaware/dump1090): Track the aircraft over your house via ADS-B with a $30 dongle.
- [csete/gpredict](https://github.com/csete/gpredict): Real-time satellite tracking and pass prediction for working the birds.

## License

MIT. See [LICENSE](LICENSE).
