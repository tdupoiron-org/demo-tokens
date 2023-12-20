const { Octokit, App } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function createGitHubReference(newRef, sha) {
  const response = await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    ref: newRef,
    sha: sha,
  });
}

async function updateGitHubReference(ref, sha) {
  const response = await octokit.request("PATCH /repos/{owner}/{repo}/git/refs/{ref}", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    ref: ref,
    sha: sha,
  });
}

createGitHubReference("refs/heads/branchA", "cc9dc9b7a270fa1ae80ba17ca42101c53c796bdb");
updateGitHubReference("refs/heads/branchA", "cc9dc9b7a270fa1ae80ba17ca42101c53c796bdb");
