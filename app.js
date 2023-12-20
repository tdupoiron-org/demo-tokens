const { Octokit, App } = require("octokit");
const fs = require('fs');
const path = require('path');
const os = require('os');

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

async function getGitHubContents(path) {
  const response = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    path: path,
  });
  return response.data;
}

async function pushGitHubContent(path, content, message) {
  const response = await octokit.request("PUT /repos/{owner}/{repo}/contents/{path}", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    path: path,
    message: message,
    content: content,
  });
}

async function deleteGitHubContent(path, message) {
  const response = await octokit.request("DELETE /repos/{owner}/{repo}/contents/{path}", {
    owner: "tdupoiron-org",
    repo: "demo-tokens",
    path: path,
    message: message,
  });
}

/*createGitHubReference("refs/heads/branchC", "cc9dc9b7a270fa1ae80ba17ca42101c53c796bdb");
updateGitHubReference("heads/branchC", "0094876c61bce74db32b9a2e194870bc528475e4");
createGitHubRelease("v1.0.0_C", "0094876c61bce74db32b9a2e194870bc528475e4");*/

async function saveFileInTempFolder(filename, content) {
  const tempFolder = fs.mkdtempSync(path.join(process.env.CODESPACE_VSCODE_FOLDER, 'temp'));
  const filePath = path.join(tempFolder, filename);
  
  fs.writeFileSync(filePath, content);
  
  console.log(`File saved in temporary folder: ${filePath}`);
}

async function main() {
  const contents = await getGitHubContents(".github/workflows/hello-world.yml");
  console.log(contents);
  //const content = Buffer.from(contents.content, 'base64').toString();
  //await saveFileInTempFolder("test.txt", content);
  await deleteGitHubContent("test.yml", "delete test file");
  //await pushGitHubContent("test.yml", contents, ".github/workflows");
}

main();