# UV (Universal Virtualenv) Reference Guide

## **1. Creating and Managing Virtual Environments**

**Create a new virtual environment in the current directory:**

```bash
uv venv
```

**Create a new virtual environment in a specific directory:**

```bash
uv venv path/to/venv
```

**Remove the virtual environment entirely:**

```bash
rm -rf .venv  # Or whatever directory you used
```

```powershell
Remove-Item -Recurse -Force .venv
```

## **2. Activating the Virtual Environment**

**Activate on macOS/Linux (bash/zsh):**

```bash
source .venv/bin/activate
```

**Activate on Windows (cmd):**

```cmd
.venv\Scripts\activate.bat
```

**Activate on Windows (PowerShell):**

```powershell
.venv\Scripts\Activate.ps1
```

**Deactivate:**

```bash
deactivate
```

## **3. Using in VS Code or Other IDEs**

- Ensure `.venv` is created in project root or specified in settings.
- VS Code auto-detects `.venv` if:
  - It exists in the workspace root
  - Or it's specified in `.vscode/settings.json`:

```json
{
  "python.pythonPath": ".venv/bin/python"
}
```

- After activation, ensure the correct Python interpreter is selected in the command palette:

```
Ctrl+Shift+P > Python: Select Interpreter
```

## **4. Installing Packages**

**Install packages from requirements.txt:**

```bash
uv pip install -r requirements.txt
```

**Install packages from pyproject.toml:**

```bash
uv pip install --sync
```

**Install a specific package:**
This modification shows that after installing a new package, you should run `uv pip freeze > requirements.txt` to capture the newly installed package in your requirements file. This is a good practice as it keeps your requirements.txt file in sync with your actual environment dependencies.

This ensures that:
1. The new package is documented for other developers
2. The project remains reproducible
3. Your requirements.txt stays up to date with all dependencies

```bash
uv pip install <package-name>
uv pip freeze > requirements.txt  # Update requirements.txt with new package
```
```

**Install package with extras:**

```bash
uv pip install "<package-name>[extra1,extra2]"
```

## **5. Uninstalling Packages**

**Uninstall a specific package:**

```bash
uv pip uninstall <package-name>
```

**Uninstall all installed packages:**

```bash
uv pip freeze > installed.txt
uv pip uninstall -y -r installed.txt
```

## **6. Listing and Checking Packages**

**List installed packages:**

```bash
uv pip list
```

**Freeze installed packages into a file:**

```bash
uv pip freeze > requirements.txt
```

**Check for broken dependencies:**

```bash
uv pip check
```

## **7. Cleaning Up**

**Clean reinstall using requirements.txt:**

```bash
uv venv reset
uv pip install -r requirements.txt
```

**Rebuild from scratch:**

```bash
rm -rf .venv
uv venv
uv pip install -r requirements.txt
```

**Manually remove unused packages:**

- Compare output of `uv pip list` to `requirements.txt`
- Uninstall extras manually:

```bash
uv pip uninstall <unused-package>
```

## **8. Tips and Best Practices**

- Use `uv` for fast dependency resolution and installs.
- Always maintain a `requirements.txt` or `pyproject.toml` for reproducibility.
- For team projects, include `.venv` in `.gitignore`, and use lockfiles.
- Avoid system-wide installations – always use isolated envs.
- Reset before deploys to reduce drift: `uv venv reset && uv pip install ...`

---

This expanded reference covers environment lifecycle, IDE integration, and advanced package management for `uv`.

