# Reinder 🗝️ 🐈

> Tinder, but for archiving GitHub repositories.

Swiping left never felt so satisfying! Reinder is your new best friend for cleaning up old, unused public repositories on GitHub. With a sleek command-line interface, you can now archive your repositories in an interactive and intuitive manner.

## Features ⚡

- 🔍 Fetch your GitHub repositories
- ➿ Filter out private, archived and forked repos
- ❓ Prompt for each repo if you want to archive it
- 🔏 Archive repos directly from the CLI
- 🎉 Celebrate your uncluttered GitHub profile!

## Installation 🛠️

Before you start, make sure you have Node.js (v12 or newer) installed.

```bash
npm install -g reinder
```

## Usage 💻

You can start off by running the CLI in your terminal:

```bash
reinder
```

Reinder will ask for your permission to scrape your GitHub token, using `gh auth token` (requires GitHub CLI installed). Alternatively, you can input it manually. Reinder will use this token to fetch and archive your repositories.

Reinder will show your repos (excluding forks, archived, and private ones) one by one, along with their size and star count. You can decide whether to archive each repo.

When you're done, Reinder will tell you how many repos it archived!

## FAQs 🤔

**Q: Does Reinder delete my repos?**
A: No, Reinder only [archives](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories) your repos. You can [unarchive](https://docs.github.com/en/repositories/archiving-a-github-repository/archiving-repositories#unarchiving-a-repository) them on GitHub if you need to.

**Q: What permissions does my GitHub token need?**
A: Your token needs `repo` scope, for fetching and archiving repositories.

## Contributing 🤝

Feel free to dive in! [Open an issue](https://github.com/tristancamejo/reinder/issues/new) or submit a PR.

## License 📃

MIT © [Tristan Camejo](https://github.com/tristancamejo)
