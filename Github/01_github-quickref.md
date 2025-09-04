# GitHub Command Line Reference & Workflows

# Basics

- **Repository**: A storage location for your project that tracks all changes
- **Commit**: A snapshot of your repository at a specific point in time
- **Branch**: A parallel version of your repository
- **Remote**: A version of your repository hosted on a server (like GitHub)
- **Fork**: Your own copy of someone else's repository
- **Clone**: Making a local copy of a repository
- **Pull Request**: Proposing changes from your fork to the original repository
- **Push**: Sending your committed changes to a remote repository
- **Pull**: Fetching and integrating changes from a remote repository

# Remotes

**Local repo**: The copy of your code on your computer.

**Remote**: A saved “bookmark” (name + URL) that points to a repo on the internet (e.g., GitHub). You can have many remotes.

***Common remote names***

- **origin**: The default name Git gives the remote when you clone. Think “my GitHub copy.”

- **upstream (remote name)**: A common convention when you fork. If you fork someproject/some-repo, then:

Note: “origin” and “upstream” are just names. You could call them “banana” and “apple,” but these two names are widely used so everyone understands them.

**Branch relationships**

- Remote‑tracking branch: Your local read‑only mirror of a branch on a remote, like origin/main or upstream/main.

- Upstream branch (of a local branch): The remote branch your local branch is “connected” to. Example: local main tracks origin/main. This is what git uses by default when you git pull or git push.

These two “upstreams” are different ideas:
“upstream” as a remote name (a repo you forked from)
“upstream branch” as the tracking target for a local branch (could be origin/main or upstream/main).

**What the common commands do**
- **git fetch**: Download new commits from remotes into remote‑tracking branches (e.g., updates origin/main). Doesn’t change your local branches.

- **git pull**: Fetch + then update your current local branch from its upstream branch (merge or rebase). 

- **git push**: Upload your local commits to a branch on a remote (usually the upstream branch of your local branch).

# README and VERSION
**README**: A markdown file (usually README.md) that serves as the front page of your repository. It's automatically displayed on GitHub and should explain what your project does, how to install/use it, and any other important information for users and contributors.

**VERSION**: A file that tracks the current version number of your project. Common formats include semantic versioning (e.g., 1.2.3) or date-based versioning. Some projects use VERSION, others use version.txt, or embed version info in code files. Helps users and automated tools know which release they're working with.

---

# Initial Setup and Configuration

**First-time Git Setup**

**Bash (Linux/macOS)**
```bash
# Set your username and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name to 'main'
git config --global init.defaultBranch main

# Configure line ending preferences
git config --global core.autocrlf input  # for macOS/Linux

# Check your configuration
git config --list
```

---

# Creating a New Repository

**From Scratch on Your Local Machine**

**Bash (Linux/macOS)**
```bash
# Create a new directory for your project
mkdir my-new-project
cd my-new-project

# Initialize a git repository
git init

# Add some files
echo "# My New Project" > README.md

# Add files to staging
git add README.md

# Create a VERSION file (optional but recommended)
echo "1.0.0" > VERSION
git add VERSION

# Commit files
git commit -m "Initial commit"

# Create repository on GitHub and push
gh repo create my-new-project --public --source=. --remote=origin --push
```
---

***Create Repository on GitHub First**

**Bash (Linux/macOS)**
```bash
# Create a new repository on GitHub using GitHub CLI
gh repo create my-new-project --public

# Clone the empty repository
git clone https://github.com/yourusername/my-new-project.git
cd my-new-project

# Add files, commit, and push
echo "# My New Project" > README.md
git add README.md
git commit -m "Initial commit"
git push -u origin main
```
---

# Repo Policies

1) Protect `main`
**Goal:** no direct pushes; PRs only; at least 1 approval; CI must pass; branch up-to-date.

**GitHub UI**
1. Go to **Settings → Branches → Branch protection rules → New rule**.
2. **Branch name pattern:** `main`
3. Enable:
   - ✅ Require a pull request before merging (Required approvals: **1**; enable “Dismiss stale approvals”)
   - ✅ Require status checks to pass before merging (add your CI check names after first run)
   - ✅ Require branches to be up to date before merging
   - ✅ Require linear history (prevents merge commits)
   - ✅ Restrict who can push to matching branches (empty = nobody; or select bots only)
   - ✅ Do not allow bypassing the above settings
4. **Enable CI:**

After the first PR runs CI, go back to Branch protection and add the exact check names under Required status checks (e.g., CI / ci).

5. **Commit Style:**

- feat: add search tool
- fix: correct reducer bug
- docs: update README
- chore: bump dependency
- Optional scopes: feat(search): support top-k

---

# Versions, Tags, Releases
**Bump version**
echo "1.2.1" > VERSION && git add VERSION && git commit -m "chore(release): 1.2.1"

**Push code + tag + release (manual)**
git push origin main
git tag v1.2.1 && git push origin v1.2.1
gh release create v1.2.1 --title "v1.2.1" --notes "Fixes: …"

**Update consumer project to new docs tag**
git subtree pull --prefix docs/shared git@github.com:Diz312/docs-hub.git v1.2.1 --squash

---

