# Git Team Workflow (Single-Trunk / Trunk‑Based Development)

This guide defines a simple, fast workflow for a developer team using a single shared branch (**`main`**) and short‑lived feature branches. It includes command‑by‑command explanations so you always know *what* you’re doing and *why*.

---

## Core Ideas

* **Single trunk**: All production‑ready code lives on **`main`**. Keep it green (CI passes) and shippable.
* **Small, short‑lived branches**: Create a feature branch from the latest `main`, make focused changes, open a PR, and merge within hours/days.
* **Feature flags**: Toggle incomplete work safely while keeping `main` releasable.
* **Rebase over merge**: Prefer a linear history by rebasing your branch on top of the latest `main`.

---

## Branches vs Forks

* Use **branches in the same repo** (recommended). Forks add friction for small internal teams.

---

## One‑Time Repo Setup (Maintainer)

1. **Protect `main`**: Require PRs, at least one review, and all CI checks green; disallow direct pushes.
2. **Enable CI**: Lint, unit tests, build must pass before merge.
3. **Agree on commit style**: e.g., Conventional Commits (`feat:`, `fix:`, `docs:`…).

---

## Quick Glossary

* **`origin`**: Your remote on GitHub.
* **`origin/main`**: GitHub’s latest `main` (remote tip).
* **local `main`**: Your computer’s `main` (moves when *you* update it).
* **`feat/x`**: Your feature branch.

---

## Day‑to‑Day Flow (with explanations)
### Check Status and Changes
**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Check repository status
git status

# View changes to tracked files
git diff

# View changes staged for commit
git diff --staged

# View commit history
git log

# View commit history with graph
git log --graph --oneline --decorate
```

### 0) Clone the repo (first time only)

```bash
git clone git@github.com:<ORG_OR_USER>/<REPO>.git   # Download repo + history to your machine
cd <REPO>                                           # Enter the project directory
```

### 1) Start work from the freshest trunk

```bash
git checkout main                                   # Switch to your local main
git pull --ff-only                                  # Fast‑forward local main to match origin/main
```

* `pull --ff-only` ensures no accidental merge commits; your local `main` now exactly equals GitHub’s `main`.

### 2) Create a small feature branch

```bash
git switch -c feat/short-description                 # Create + switch to a new branch from current main
```

* Use a clear, verb‑y name (e.g., `feat/search-tool`, `fix/timeout`). Keep scope tight.

### 3) Make and stage changes incrementally

```bash
git add <files>                                      # Stage only the files you want in the next commit
```

### 4) Commit locally (snapshots only you can see for now)

```bash
git commit -m "feat(search): add tool schema and reducer"   # Record a snapshot in LOCAL history
```

* Commits are **local** until pushed. Commit early, commit often.

### 5) Stay current while you work (rebase on latest remote main)

```bash
git fetch origin                                     # Update your view of remote branches (origin/*)
git rebase origin/main                               # Replay your commits on top of the newest origin/main
```

* **Fetch** updates `origin/main` locally without changing your branch yet.
* **Rebase** moves your branch’s base to the latest trunk; you resolve conflicts early, in small chunks.

> Alternative if you prefer to refresh local main first:
>
> ```bash
> git checkout main && git pull --ff-only            # Update local main to match origin/main
> git checkout feat/short-description
> git rebase main                                    # Rebase your branch onto local main
> ```

### 6) Push your branch and open a PR

```bash
git push -u origin feat/short-description           # Publish branch; -u sets upstream for simpler future pushes
```

* After `-u`, you can just run `git push` from this branch; Git remembers the remote target.
* Open a PR in GitHub. Keep PRs small; add context, screenshots (if UI), and test notes.

### 7) Address review feedback

* Commit more changes on the same branch; push again. CI should stay green.

### 8) Merge strategy

* **Squash merge** the PR into `main` once CI passes and review is approved.
* Squash keeps trunk history clean (one commit per PR) while preserving detailed commit messages inside the PR.

### 9) Update your local trunk after merge

```bash
git checkout main
git pull --ff-only                                  # Bring your local main up to date with merged PRs
```

### 10) Clean up your branch (optional but tidy)

```bash
git branch -d feat/short-description                # Delete local branch
git push origin :feat/short-description             # Delete remote branch
```

---

## Resolving Conflicts (during rebase)

If `git rebase origin/main` reports conflicts:

```bash
git status                                          # See which files conflict
# Edit files to resolve conflicts
git add <resolved-file>                             # Mark file as resolved
git rebase --continue                               # Proceed to next commit in the rebase
```

Abort if necessary:

```bash
git rebase --abort                                  # Return branch to state before rebase
```

---

## Keeping History Clean

* Prefer **rebase** over merge when updating your feature branch.
* Keep PRs small (≤300 LOC when possible) and focused on a single concern.
* Use **feature flags** for incomplete work; merge earlier, iterate safely.

---

## Getting Latest Code from Others

* While on your branch:

```bash
git fetch origin                                     # Get latest remote commits locally
git rebase origin/main                               # Move your work on top of them
```

* Or refresh local trunk first, then rebase:

```bash
git checkout main && git pull --ff-only
git checkout feat/your-branch && git rebase main
```

---

## Do My Commits Affect Only What I Touched?

Yes. Commits contain only your staged changes. CI protects against unintended breakage by running tests on the combined result.

---

## Naming Conventions

* Branches: `feat/...`, `fix/...`, `chore/...`, `docs/...` (e.g., `feat/langgraph-tool-node`).
* Commits: Conventional Commits (e.g., `feat(search): add reranker tool`).

---

## CI Gates (recommended)

* **Lint + format** (fast fail)
* **Unit tests**
* **Build** (if applicable)
* Optional: nightly e2e or integration tests

---

## Common Troubleshooting

* **I rebased and now my branch shows many commits:** You likely rebased onto the wrong base (e.g., old local `main`). Re‑run `git fetch origin && git rebase origin/main`.
* **I committed to the wrong branch:** Create a new branch from HEAD and continue there: `git switch -c fix/move-work-here`.
* **I need to undo the last commit locally:** `git reset --soft HEAD~1` (keep changes staged) or `git reset --hard HEAD~1` (discard changes).

---

## TL;DR Command Cheat Sheet

```bash
# Start new work
git checkout main && git pull --ff-only
git switch -c feat/x

# Work → stage → commit
git add -p && git commit -m "feat: ..."

# Stay current
git fetch origin && git rebase origin/main

# Publish + PR
git push -u origin feat/x

# After merge
git checkout main && git pull --ff-only
```
