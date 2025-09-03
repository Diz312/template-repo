# GitHub Command Line Reference & Workflows

## Basic Git Concepts

- **Repository**: A storage location for your project that tracks all changes
- **Commit**: A snapshot of your repository at a specific point in time
- **Branch**: A parallel version of your repository
- **Remote**: A version of your repository hosted on a server (like GitHub)
- **Fork**: Your own copy of someone else's repository
- **Clone**: Making a local copy of a repository
- **Pull Request**: Proposing changes from your fork to the original repository
- **Push**: Sending your committed changes to a remote repository
- **Pull**: Fetching and integrating changes from a remote repository

## Initial Setup and Configuration

### First-time Git Setup

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

**PowerShell (Windows)**
```powershell
# Set your username and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name to 'main'
git config --global init.defaultBranch main

# Configure line ending preferences
git config --global core.autocrlf true

# Check your configuration
git config --list
```

### GitHub CLI Authentication

**Bash (Linux/macOS)**
```bash
# Install GitHub CLI
# macOS:
brew install gh

# Linux:
sudo apt install gh  # Debian/Ubuntu
sudo dnf install gh  # Fedora
sudo pacman -S github-cli  # Arch Linux

# Login to GitHub
gh auth login
```

**PowerShell (Windows)**
```powershell
# Install GitHub CLI
winget install GitHub.cli
# or
scoop install gh
# or
choco install gh

# Login to GitHub
gh auth login
```

## Creating a New Repository

### From Scratch on Your Local Machine

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

# Commit files
git commit -m "Initial commit"

# Create repository on GitHub and push
gh repo create my-new-project --public --source=. --remote=origin --push
```

**PowerShell (Windows)**
```powershell
# Create a new directory for your project
New-Item -ItemType Directory -Name my-new-project
Set-Location my-new-project

# Initialize a git repository
git init

# Add some files
"# My New Project" | Out-File -FilePath README.md

# Add files to staging
git add README.md

# Commit files
git commit -m "Initial commit"

# Create repository on GitHub and push
gh repo create my-new-project --public --source=. --remote=origin --push
```

### Create Repository on GitHub First

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

**PowerShell (Windows)**
```powershell
# Create a new repository on GitHub using GitHub CLI
gh repo create my-new-project --public

# Clone the empty repository
git clone https://github.com/yourusername/my-new-project.git
Set-Location my-new-project

# Add files, commit, and push
"# My New Project" | Out-File -FilePath README.md
git add README.md
git commit -m "Initial commit"
git push -u origin main
```

## Working with Existing Repositories

### Cloning a Repository

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Clone a repository to your local machine
git clone https://github.com/username/repository.git

# Clone with a specific directory name
git clone https://github.com/username/repository.git my-project-folder

# Clone a specific branch
git clone -b branch-name https://github.com/username/repository.git

# Clone recursively (including submodules)
git clone --recursive https://github.com/username/repository.git
```

### Fork and Clone a Public Repository

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Fork a repository using GitHub CLI
gh repo fork username/repository

# Clone your forked repository
git clone https://github.com/yourusername/repository.git

# Add the original repository as an upstream remote
git remote add upstream https://github.com/username/repository.git

# Verify remotes
git remote -v
```

## Daily Workflow

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

### Making Changes

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Create and switch to a new branch
git checkout -b feature-branch

# Or create branch then switch (newer Git versions)
git branch feature-branch
git switch feature-branch

# Stage changes for commit
git add filename.txt          # Stage specific file
git add .                     # Stage all changes
git add -p                    # Interactively stage parts of files

# Commit changes
git commit -m "Add new feature"

# Amend the most recent commit
git commit --amend -m "Updated commit message"

# Amend the most recent commit without changing the message
git commit --amend --no-edit
```

### Synchronizing with Remote

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Push your branch to the remote repository
git push -u origin feature-branch

# Fetch changes from remote
git fetch

# Pull changes from remote
git pull

# Pull with rebase instead of merge
git pull --rebase origin main

# Update your fork from original repository
git fetch upstream
git checkout main
git merge upstream/main
git push origin main
```

## Advanced Workflows

### Forking Workflow for Contributing to Public Projects

**Bash (Linux/macOS)**
```bash
# 1. Fork the repository on GitHub
gh repo fork original-owner/repository

# 2. Clone your fork
git clone https://github.com/yourusername/repository.git
cd repository

# 3. Set up upstream remote
git remote add upstream https://github.com/original-owner/repository.git

# 4. Create a feature branch
git checkout -b my-feature

# 5. Make changes and commit
git add .
git commit -m "Implement new feature"

# 6. Keep your branch updated with upstream
git fetch upstream
git rebase upstream/main

# 7. Push to your fork
git push -u origin my-feature

# 8. Create a pull request
gh pr create --base original-owner:main --head yourusername:my-feature
```

**PowerShell (Windows)**
```powershell
# 1. Fork the repository on GitHub
gh repo fork original-owner/repository

# 2. Clone your fork
git clone https://github.com/yourusername/repository.git
Set-Location repository

# 3. Set up upstream remote
git remote add upstream https://github.com/original-owner/repository.git

# 4. Create a feature branch
git checkout -b my-feature

# 5. Make changes and commit
git add .
git commit -m "Implement new feature"

# 6. Keep your branch updated with upstream
git fetch upstream
git rebase upstream/main

# 7. Push to your fork
git push -u origin my-feature

# 8. Create a pull request
gh pr create --base original-owner:main --head yourusername:my-feature
```

### Clone Public Repo and Redirect to Your Own

**Bash (Linux/macOS)**
```bash
# 1. Clone the public repository
git clone https://github.com/original-owner/repository.git
cd repository

# 2. Create a new repository on your GitHub account
gh repo create your-new-repo --private

# 3. Change the remote URL to your repository
git remote set-url origin https://github.com/yourusername/your-new-repo.git

# 4. Push to your repository
git push -u origin main

# Alternative approach: clone, then add your repo as a different remote
git clone https://github.com/original-owner/repository.git
cd repository
git remote add mine https://github.com/yourusername/your-new-repo.git
git push -u mine main
```

**PowerShell (Windows)**
```powershell
# 1. Clone the public repository
git clone https://github.com/original-owner/repository.git
Set-Location repository

# 2. Create a new repository on your GitHub account
gh repo create your-new-repo --private

# 3. Change the remote URL to your repository
git remote set-url origin https://github.com/yourusername/your-new-repo.git

# 4. Push to your repository
git push -u origin main

# Alternative approach: clone, then add your repo as a different remote
git clone https://github.com/original-owner/repository.git
Set-Location repository
git remote add mine https://github.com/yourusername/your-new-repo.git
git push -u mine main
```

### Working with Multiple Remotes

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Add multiple remotes
git remote add origin https://github.com/yourusername/repository.git
git remote add upstream https://github.com/original-owner/repository.git
git remote add colleague https://github.com/colleague/repository.git

# Fetch from a specific remote
git fetch upstream

# Push to a specific remote
git push origin main
git push colleague feature-branch

# Pull from a specific remote and branch
git pull upstream main
```

## Branching Strategies

### Feature Branch Workflow

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Create a feature branch
git checkout -b feature/user-authentication

# Make changes and commit
git add .
git commit -m "Add user authentication"

# Push the feature branch to the remote
git push -u origin feature/user-authentication

# Create a pull request for review
gh pr create --title "User Authentication" --body "Implements login and registration"

# After approval, merge via GitHub or locally:
git checkout main
git merge feature/user-authentication
git push origin main
```

### Gitflow Workflow

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# Initialize gitflow
git flow init

# Start a new feature
git flow feature start user-authentication

# Finish a feature (merges to develop branch)
git flow feature finish user-authentication

# Start a release
git flow release start v1.0.0

# Finish a release (merges to main and develop, tags the release)
git flow release finish v1.0.0

# Push tags
git push --tags
```

## Troubleshooting & Recovery

**Bash (Linux/macOS)**
```bash
# Discard changes in working directory
git checkout -- filename.txt
git restore filename.txt  # Git 2.23+

# Unstage changes
git reset HEAD filename.txt
git restore --staged filename.txt  # Git 2.23+

# Fix the last commit
git commit --amend

# Reset to a specific commit
git reset --soft HEAD~1  # Keep changes staged
git reset --mixed HEAD~1  # Unstage changes (default)
git reset --hard HEAD~1  # Discard changes (DANGEROUS)

# Find lost commits (after a hard reset)
git reflog
git checkout -b recovery-branch 5d12ef2  # Commit from reflog

# Stash changes temporarily
git stash save "Work in progress"
git stash list
git stash apply stash@{0}
git stash pop  # Apply and remove the stash
git stash drop stash@{0}  # Delete a stash

# Cherry-pick a commit from another branch
git cherry-pick commit-hash
```

**PowerShell (Windows)**
```powershell
# Discard changes in working directory
git checkout -- filename.txt
git restore filename.txt  # Git 2.23+

# Unstage changes
git reset HEAD filename.txt
git restore --staged filename.txt  # Git 2.23+

# Fix the last commit
git commit --amend

# Reset to a specific commit
git reset --soft HEAD~1  # Keep changes staged
git reset --mixed HEAD~1  # Unstage changes (default)
git reset --hard HEAD~1  # Discard changes (DANGEROUS)

# Find lost commits (after a hard reset)
git reflog
git checkout -b recovery-branch 5d12ef2  # Commit from reflog

# Stash changes temporarily
git stash save "Work in progress"
git stash list
git stash apply stash@{0}
git stash pop  # Apply and remove the stash
git stash drop stash@{0}  # Delete a stash

# Cherry-pick a commit from another branch
git cherry-pick commit-hash
```

## IDE Integration

### Setting Up Git in VSCode

1. Install VSCode
2. Install the "Git Lens" extension for enhanced Git functionality
3. Open your repository folder in VSCode
4. Use the Source Control tab (Ctrl+Shift+G) to manage Git operations
5. Configure settings.json for Git:

```json
{
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.autofetch": true
}
```

### Setting Up Git in JetBrains IDEs (IntelliJ, PyCharm, etc.)

1. Open your repository in the IDE
2. Go to Settings/Preferences > Version Control > Git
3. Verify the path to Git executable
4. Use the VCS menu or the Git panel for operations
5. Commit changes using Ctrl+K
6. Push using Ctrl+Shift+K
7. Pull using Ctrl+T

## GitHub CLI Advanced Commands

**Bash (Linux/macOS) and PowerShell (Windows)**
```bash
# List pull requests
gh pr list

# Create a pull request
gh pr create --title "New feature" --body "Description of the feature"

# Check out a pull request locally
gh pr checkout 123

# View a pull request in the browser
gh pr view 123 --web

# Merge a pull request
gh pr merge 123

# List issues
gh issue list

# Create an issue
gh issue create --title "Bug report" --body "Description of the bug"

# Clone a repository you don't own
gh repo clone username/repository

# View repository in browser
gh repo view --web
```

## Git Hooks

### Setup Common Hooks

**Bash (Linux/macOS)**
```bash
# Create a pre-commit hook
cat > .git/hooks/pre-commit << 'EOF'
#!/bin/sh
# Run linting before commit
npm run lint
EOF

# Make the hook executable
chmod +x .git/hooks/pre-commit

# Create a pre-push hook
cat > .git/hooks/pre-push << 'EOF'
#!/bin/sh
# Run tests before push
npm test
EOF

# Make the hook executable
chmod +x .git/hooks/pre-push
```

**PowerShell (Windows)**
```powershell
# Create a pre-commit hook
@"
#!/bin/sh
# Run linting before commit
npm run lint
"@ | Out-File -FilePath .git/hooks/pre-commit -Encoding utf8

# Create a pre-push hook
@"
#!/bin/sh
# Run tests before push
npm test
"@ | Out-File -FilePath .git/hooks/pre-push -Encoding utf8

# Note: Windows doesn't use the execute permission like Unix systems
# But Git for Windows will still run the hook files
```

## Best Practices

1. **Write good commit messages**
   - Use the imperative mood ("Add feature" not "Added feature")
   - First line should be 50 characters or less
   - Further details can be added after a blank line

2. **Commit often, push regularly**
   - Make small, focused commits
   - Push to remote to back up your work

3. **Use branches effectively**
   - Never commit directly to main/master in a team setting
   - Use feature branches for new work
   - Delete branches after merging

4. **Keep your fork updated**
   - Regularly sync with the upstream repository

5. **Use .gitignore properly**
   - Exclude build artifacts, dependencies, and environment files
   - Include a standard .gitignore for your project type

6. **Review changes before committing**
   - Use `git diff` or IDE tools to review changes
   - Check that you're not committing unwanted files

7. **Sign your commits**

   **Bash (Linux/macOS) and PowerShell (Windows)**
   ```bash
   # Configure GPG key
   git config --global user.signingkey YOUR_GPG_KEY_ID
   git config --global commit.gpgsign true
   
   # Sign commits
   git commit -S -m "Your commit message"
   ```

8. **Use tags for releases**

   **Bash (Linux/macOS) and PowerShell (Windows)**
   ```bash
   # Create an annotated tag
   git tag -a v1.0.0 -m "Version 1.0.0"
   
   # Push tags
   git push --tags
   ```

9. **Add a note at the top of your README about copy/paste**
   - Add a note to inform users that code blocks can be copied by triple-clicking on the line or using keyboard shortcuts (Ctrl+C/Cmd+C) after selecting the text
   - Consider including this in your markdown files:
   
   ```markdown
   > **Note**: To copy commands from code blocks in this document, triple-click on a line to select it or select the text manually, then copy with Ctrl+C/Cmd+C.
   ```