import type { EditableSiteContent } from "@/lib/content";

const GITHUB_API_BASE = "https://api.github.com";

type GitHubFileResponse = {
  content?: string;
  sha?: string;
  message?: string;
  encoding?: string;
};

type GitHubContentResult = {
  content: string;
  sha: string;
};

type GitHubBlobResponse = {
  content?: string;
  encoding?: string;
  message?: string;
};

type GitHubFileState = {
  content: string | null;
  sha: string;
};

function encodeContentPath(filePath: string) {
  return filePath
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function getGitHubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28"
  };
}

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN?.trim();
  const owner = process.env.GITHUB_OWNER?.trim();
  const repo = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim();
  const filePath = process.env.CONTENT_FILE_PATH?.trim() || "data/content.json";

  if (!token || !owner || !repo || !branch) {
    return null;
  }

  return {
    token,
    owner,
    repo,
    branch,
    filePath
  };
}

function requireGitHubConfig() {
  const config = getGitHubConfig();

  if (!config) {
    throw new Error("GitHub persistence is not configured.");
  }

  return config;
}

async function fetchGitHubFile() {
  const config = getGitHubConfig();

  if (!config) {
    return null;
  }

  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${encodeContentPath(
      config.filePath
    )}?ref=${encodeURIComponent(config.branch)}`,
    {
      headers: getGitHubHeaders(config.token),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as GitHubFileResponse;

  if (!payload.sha) {
    return null;
  }

  if (payload.content) {
    return {
      content: Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8"),
      sha: payload.sha
    } satisfies GitHubContentResult;
  }

  const blobResponse = await fetch(
    `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/git/blobs/${payload.sha}`,
    {
      headers: getGitHubHeaders(config.token),
      cache: "no-store"
    }
  );

  if (!blobResponse.ok) {
    return {
      content: null,
      sha: payload.sha
    } satisfies GitHubFileState;
  }

  const blobPayload = (await blobResponse.json()) as GitHubBlobResponse;

  if (!blobPayload.content || blobPayload.encoding !== "base64") {
    return {
      content: null,
      sha: payload.sha
    } satisfies GitHubFileState;
  }

  return {
    content: Buffer.from(blobPayload.content.replace(/\n/g, ""), "base64").toString("utf8"),
    sha: payload.sha
  } satisfies GitHubFileState;
}

export async function getContentFromGitHub() {
  try {
    const file = await fetchGitHubFile();

    if (!file?.content) {
      return null;
    }

    return {
      content: file.content,
      sha: file.sha
    } satisfies GitHubContentResult;
  } catch (error) {
    console.error("Failed to read content from GitHub.", error);
    return null;
  }
}

export async function updateContentOnGitHub(content: EditableSiteContent) {
  const config = requireGitHubConfig();
  const existing = await fetchGitHubFile();

  if (!existing?.sha) {
    throw new Error("Unable to read the existing content file from GitHub.");
  }

  const serializedContent = `${JSON.stringify(content, null, 2)}\n`;
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${encodeContentPath(
      config.filePath
    )}`,
    {
      method: "PUT",
      headers: {
        ...getGitHubHeaders(config.token),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: "chore: update Kamkimat website content",
        content: Buffer.from(serializedContent, "utf8").toString("base64"),
        branch: config.branch,
        sha: existing.sha
      })
    }
  );

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as GitHubFileResponse | null;
    throw new Error(payload?.message || "GitHub commit failed.");
  }

  return {
    ...content
  };
}
