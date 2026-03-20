export const STORAGE_KEY = 'portfolio_admin_data_v1';

const FEATURED_REPO_NAME = 'PayOrchestrator';
const GITHUB_USER = 'aditya739';

export const DEFAULT_SKILLS = [
  'Python',
  'JavaScript',
  'TypeScript',
  'C++',
  'Java',
  'C',
  'SQL',
  'Golang (Learning)',
  'Node.js',
  'Express.js',
  'React.js',
  'Vite',
  'Tailwind CSS',
  'MongoDB',
  'MySQL',
  'Optimization',
  'Indexing',
  'Git',
  'GitHub',
  'Docker',
  'Postman',
  'VS Code',
  'Vercel',
  'Heroku',
  'CI/CD',
];

function createId(seed) {
  // Prefer crypto.randomUUID when available, else fall back to seed.
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return String(seed ?? Math.random()).replace(/\W+/g, '');
}

export function readPortfolioData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function writePortfolioData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getFeaturedProjectName() {
  return FEATURED_REPO_NAME;
}

export function getDefaultGithubUser() {
  return GITHUB_USER;
}

export function createDefaultPortfolioData() {
  return {
    version: 1,
    skills: DEFAULT_SKILLS.map((name) => ({ id: createId(name), name })),
    projects: [],
    updatedAt: Date.now(),
  };
}

function normalizeProjectsFromGitHub(repos) {
  const featuredName = FEATURED_REPO_NAME;

  const filtered = (Array.isArray(repos) ? repos : [])
    .filter((repo) => repo && !repo.fork)
    .slice(0, 10);

  // Keep ordering stable: featured first, then the rest.
  filtered.sort((a, b) => {
    const aFeatured = a.name === featuredName ? 1 : 0;
    const bFeatured = b.name === featuredName ? 1 : 0;
    return bFeatured - aFeatured;
  });

  return filtered.map((repo) => {
    const isFeatured = repo.name === featuredName;
    return {
      id: createId(repo.name),
      name: repo.name,
      description: repo.description || '',
      link: repo.html_url || '',
      language: repo.language || 'Full Stack',
      featured: isFeatured,
      stars: repo.stargazers_count ?? 0,
      createdAt: repo.created_at || '',
      updatedAt: Date.now(),
    };
  });
}

export async function initPortfolioDataFromGitHub({
  githubUser = GITHUB_USER,
  fetchPerPage = 12,
} = {}) {
  const base = createDefaultPortfolioData();

  const response = await fetch(
    `https://api.github.com/users/${githubUser}/repos?per_page=${fetchPerPage}&sort=created&direction=desc`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    }
  );

  if (!response.ok) {
    // If GitHub fails, still return the defaults (skills only).
    return base;
  }

  const data = await response.json();
  const projects = normalizeProjectsFromGitHub(data);

  // Ensure at least one featured project exists if we got any projects.
  if (projects.length > 0 && !projects.some((p) => p.featured)) {
    projects[0].featured = true;
  }

  return {
    ...base,
    projects,
    updatedAt: Date.now(),
  };
}

