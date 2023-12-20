const { Octokit, App } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function createGitHubReference() {
  const response = await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    ref: "refs/heads/main",
    sha: "827efc6d56897b048c772eb4087f854f46256132",
  });
}