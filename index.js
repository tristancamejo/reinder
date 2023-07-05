#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import { exec } from "node:child_process";
import { Octokit } from "octokit";
import ora from "ora";

let GitHubToken = "";

const { fetchToken } = await inquirer.prompt([
  {
    type: "confirm",
    name: "fetchToken",
    message:
      "Do you give me permission to fetch your GitHub token via `gh token`?",
  },
]);

let spinner = ora("Fetching your GitHub token...");

if (fetchToken) {
  spinner.start();

  GitHubToken = await new Promise((resolve, reject) => {
    exec("gh auth token", (error, stdout, stderr) => {
      if (error || stderr) {
        console.error(error || stderr);
        reject(error || stderr);
      }

      resolve(stdout.trim());
    });
  });
} else {
  const { token } = await inquirer.prompt([
    {
      type: "input",
      name: "token",
      message:
        "What is your GitHub token? (must have permissions for fetching and archiving repos)",
    },
  ]);

  GitHubToken = token;
}

const octokit = new Octokit({ auth: GitHubToken });

const {
  data: { login },
} = await octokit.rest.users.getAuthenticated();

spinner.succeed(
  `Fetched your GitHub token and successfully authenticated as ${chalk.green(
    login
  )}!`
);

spinner = ora("Fetching your repos...").start();

const { data: repos } = await octokit.rest.repos.listForAuthenticatedUser({
  sort: "updated",
  per_page: 100,
  type: "owner",
});

const frepos = repos //
  .reverse()
  .filter((repo) => repo.private === false)
  .filter((repo) => !repo.archived)
  .filter((repo) => !repo.fork);

spinner.succeed(
  `Fetched ${chalk.green(frepos.length)} public repos! ${chalk.red(
    "(excluding forks and archived repos)"
  )}!`
);

let archived = 0;

process.on("exit", () => {
  console.log(`Archived ${chalk.green(archived)} repos!`);
});

for (const repo of frepos) {
  const { name, size, stargazers_count } = repo;

  const { archiveRepo } = await inquirer.prompt([
    {
      type: "confirm",
      name: "archiveRepo",
      message: `${login}/${name} (${size}kb, ${stargazers_count} stars)`,
    },
  ]);

  if (archiveRepo) {
    spinner = ora(`Archiving ${login}/${name}...`).start();

    try {
      await octokit.rest.repos.update({
        owner: login,
        repo: name,
        archived: true,
      });

      archived += 1;

      spinner.succeed(`Archived ${chalk.green(`${login}/${name}`)}!`);
    } catch (error) {
      spinner.fail(`Failed to archive ${chalk.red(`${login}/${name}`)}!`);
      console.error(error);
      console.log(chalk.gray("continuing..."));
    }
  }
}
