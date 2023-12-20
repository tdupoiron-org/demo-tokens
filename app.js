const { Octokit, App } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

async function createGitHubReference(ref, sha) {
  const response = await octokit.request("POST /repos/{owner}/{repo}/git/refs", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    ref: ref,
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

async function createGitHubRelease(tag_name, target_commitish) {
  const response = await octokit.request("POST /repos/{owner}/{repo}/releases", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    tag_name: tag_name,
    target_commitish: target_commitish,
  });
}

createGitHubReference("refs/heads/branchB", "cc9dc9b7a270fa1ae80ba17ca42101c53c796bdb");
updateGitHubReference("heads/branchB", "0094876c61bce74db32b9a2e194870bc528475e4");
createGitHubRelease("v1.0.0_B", "0094876c61bce74db32b9a2e194870bc528475e4");
