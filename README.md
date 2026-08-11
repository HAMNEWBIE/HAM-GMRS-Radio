# HAM-GMRS-Radio

A simple static site for ham radio, GMRS, and mesh networking. Frequencies,
license paths, useful links, and Net Bingo.

## Pages

- `index.html`: field reference (GMRS channels, ham quick reference, mesh, links)
- `bingo.html`: Net Bingo, randomized cards of things that actually happen on
  nets, with decks for ham, GMRS, and SKYWARN/weather nets. Play online, print,
  or download as PNG. Cards are seeded, so sharing the URL shares the card.

## Local preview

Any static server works:

```bash
python3 -m http.server 8000
```

## Hosting

Built for GitHub Pages: plain HTML/CSS/JS, no build step. Enable Pages on the
`main` branch in the repo settings and it just works.

## License

MIT. See [LICENSE](LICENSE).
