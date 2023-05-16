import axios from "axios"

let API_TOKEN = "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"
let API_CONFIG = {
  headers: {
    Authorization: `token ${API_TOKEN}`
  }
}
let API_URL = 'https://api.github.com'

export interface GithubUserProfile {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  repos: Array<{
    name: string;
    html_url: string;
    description: string | null;
    language: string | null;
    updated_at: string;
  }>;
}

export let getUserProfile = async (username: string) => {
  let response = await axios.get(`${API_URL}/users/${username}`, API_CONFIG)

  return response.data as GithubUserProfile
}

export let getUserRepos = async (username: string) => {
  let response = await axios.get(`${API_URL}/users/${username}/repos`, API_CONFIG)

  let repos = response.data.map((repo: any) => repo.name)

  return repos
}

export let getUserData = async (username: string) => {
  let [profileData, repos] = await Promise.all([
    getUserProfile(username),
    getUserRepos(username)
  ])

  return {
    ...profileData,
    repos
  }
}
