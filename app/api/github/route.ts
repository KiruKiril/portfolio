import { NextResponse } from "next/server";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  fork: boolean;
}

export async function GET() {
  try {
    const res = await fetch(
      "https://api.github.com/users/KiruKiril/repos?sort=updated&per_page=30",
      {
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch GitHub repos" },
        { status: res.status }
      );
    }

    const repos: GitHubRepo[] = await res.json();

    // Filter out forks, sort by stars then updated date
    const filtered = repos
      .filter((r) => !r.fork)
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 9);

    return NextResponse.json(filtered);
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
