# MCP Servers for Claude Agents (Claude Code CLI)

**Model Context Protocol (MCP)** servers extend Claude Code's capabilities by providing standardized access to tools, data sources, and external services. This document outlines all official free MCP servers and how to configure them for your 14 specialized agents.

---

## Quick Start (2 Minutes)

Claude Code uses a **project-based configuration file** (`.mcp.json`) that you can check into git and share with your team.

**Enable your first MCP server suite:**
```bash
./scripts/toggle-mcp.sh database-suite on
```

**See what's enabled:**
```bash
cat .mcp.json | jq '.mcpServers[] | select(.enabled==true) | .command'
```

**Restart Claude Code** to load the enabled servers.

---

## How It Works

Claude Code reads MCP server configuration from `.mcp.json` at your project root. When you start Claude Code:

1. ✅ Claude Code loads `.mcp.json`
2. ✅ Filters servers marked as `"enabled": true`
3. ✅ Starts those MCP servers
4. ✅ You can use them in your conversation

**Configuration Scopes** (Claude Code supports three):
- **Project** (`.mcp.json`) - Shared via git, team-wide
- **Local** (`~/.claude.json`) - Private to you, this project only
- **User** (`~/.claude.json`) - Available in all projects on your machine

This setup uses **Project scope** for easy team collaboration.

---

## Official MCP Servers (By Anthropic)

| Server | NPM Package | Purpose | Use Cases |
|--------|-------------|---------|-----------|
| **Filesystem** | `@modelcontextprotocol/server-filesystem` | File operations with configurable access | Read/write code files, configs, docs |
| **Git** | `@modelcontextprotocol/server-git` | Git repository operations | Commit history, branch analysis, diffs |
| **GitHub** | `@modelcontextprotocol/server-github` | GitHub API integration | PRs, issues, repo management |
| **Memory** | `@modelcontextprotocol/server-memory` | Knowledge graph persistence | Context retention across sessions |
| **Sequential Thinking** | `@modelcontextprotocol/server-sequentialthinking` | Step-by-step reasoning | Complex problem decomposition |
| **Fetch** | `@modelcontextprotocol/server-fetch` | HTTP content retrieval | Web scraping, API testing, research |
| **Puppeteer** | `@modelcontextprotocol/server-puppeteer` | Browser automation | Screenshots, dynamic content, E2E testing |
| **Time** | `@modelcontextprotocol/server-time` | Time utilities | Current time, timezone conversion |
| **PostgreSQL** | `@modelcontextprotocol/server-postgres` | PostgreSQL database access | Schema inspection, query execution |
| **SQLite** | `@modelcontextprotocol/server-sqlite` | SQLite database access | Database analysis, queries |
| **Supabase** | `@supabase/mcp-server` | Supabase PostgreSQL & REST API | Database + auth operations, serverless functions |

---

## Agent-Specific MCP Server Recommendations

### **Agent 1: Codebase Analyzer** (Cyan)
Analyzes project structure, architecture, and patterns.

**Suite:** `codebase-analyzer-suite`
**Servers:** filesystem, git, github, memory

---

### **Agent 2: Planning & Innovation Specialist** (Purple)
Creates PRDs, feature prioritization, and requirements.

**Suite:** `planning-suite`
**Servers:** memory, sequentialThinking, fetch, github

---

### **Agent 3: Web Research Specialist** (Green)
Conducts market research and technology evaluation.

**Suite:** `research-suite`
**Servers:** fetch, puppeteer, memory, time

---

### **Agent 4: Enterprise Architect** (Blue)
Designs system-wide architecture and patterns.

**Suite:** `architecture-suite`
**Servers:** sequentialThinking, memory, filesystem, git

---

### **Agent 5: API Integration Architect** (Blue)
Designs APIs, contracts, and integration patterns.

**Suite:** `api-suite`
**Servers:** fetch, puppeteer, filesystem, github, supabase

---

### **Agent 6: UI/UX Design Expert** (Pink)
Creates wireframes, mockups, and design systems.

**Suite:** `design-suite`
**Servers:** fetch, puppeteer, filesystem, memory

---

### **Agent 7: Database & Data Expert** (Cyan)
Designs schemas, optimizes queries, manages data.

**Suite:** `database-suite`
**Servers:** postgres, sqlite, supabase, memory, filesystem

---

### **Agent 8: Next.js Frontend Engineer** (Blue)
Implements React/Next.js components.

**Suite:** `frontend-suite`
**Servers:** filesystem, git, github, puppeteer, fetch

---

### **Agent 9: DevOps & Infrastructure** (Purple)
Manages CI/CD, containers, and infrastructure.

**Suite:** `devops-suite`
**Servers:** git, github, filesystem

---

### **Agent 10: Code Quality & Standards** (Yellow)
Linting, static analysis, code standards.

**Suite:** `quality-suite`
**Servers:** filesystem, git, github

---

### **Agent 11: Code Review Expert** (Yellow)
Code review, design feedback, best practices.

**Suite:** `review-suite`
**Servers:** git, github, filesystem, memory

---

### **Agent 12: Testing & QA** (Cyan)
Test writing, coverage analysis, E2E testing.

**Suite:** `testing-suite`
**Servers:** filesystem, git, puppeteer, github

---

### **Agent 13: Security & Compliance Auditor** (Red)
Security scanning, vulnerability detection, compliance.

**Suite:** `security-suite`
**Servers:** filesystem, git, github

---

### **Agent 14: Documentation Maintainer** (Orange)
Creates API docs, runbooks, guides.

**Suite:** `docs-suite`
**Servers:** filesystem, git, github, fetch, memory

---

## Configuration File (`.mcp.json`)

The `.mcp.json` file at your project root defines all MCP servers and groups them into suites.

**Example:**
```json
{
  "mcpServers": {
    "git": {
      "enabled": false,
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"],
      "description": "Git repository operations"
    },
    "postgres": {
      "enabled": false,
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      },
      "description": "PostgreSQL database access"
    }
  },
  "suites": {
    "database-suite": ["postgres", "sqlite", "supabase", "memory", "filesystem"],
    "devops-suite": ["git", "github", "filesystem"]
  }
}
```

**Key points:**
- `enabled: true/false` controls which servers start
- `env` variables support `${VAR}` expansion (e.g., `${DATABASE_URL}`)
- `suites` group servers for easy enable/disable
- The file is committed to git (no secrets!)

---

## Using the Toggle Scripts

Two scripts help manage MCP servers - use whichever you prefer (they work identically).

### Bash Script

```bash
# Enable a suite
./scripts/toggle-mcp.sh database-suite on

# Disable a suite
./scripts/toggle-mcp.sh frontend-suite off

# Toggle a single server
./scripts/toggle-mcp.sh postgres toggle

# List all suites and servers
./scripts/toggle-mcp.sh
```

### Node.js Script

```bash
# Enable a suite
./scripts/toggle-mcp.js database-suite on

# Disable a single server
./scripts/toggle-mcp.js github off

# Toggle a suite
./scripts/toggle-mcp.js planning-suite toggle

# List all suites and servers
./scripts/toggle-mcp.js
```

### Available Suites

```
codebase-analyzer-suite    # Agent 1: Project analysis
planning-suite             # Agent 2: Planning & innovation
research-suite             # Agent 3: Web research
architecture-suite         # Agent 4: System architecture
api-suite                  # Agent 5: API design
design-suite               # Agent 6: UI/UX design
database-suite             # Agent 7: Database design
frontend-suite             # Agent 8: Frontend development
devops-suite               # Agent 9: DevOps & CI/CD
quality-suite              # Agent 10: Code quality
review-suite               # Agent 11: Code review
testing-suite              # Agent 12: Testing & QA
security-suite             # Agent 13: Security audit
docs-suite                 # Agent 14: Documentation
```

---

## Usage Examples

### Enable all tools for database work

```bash
./scripts/toggle-mcp.sh database-suite on
```

Enable: postgres, sqlite, supabase, memory, filesystem

### Enable frontend development tools

```bash
./scripts/toggle-mcp.sh frontend-suite on
```

Enable: filesystem, git, github, puppeteer, fetch

### Enable just Git access

```bash
./scripts/toggle-mcp.sh git on
```

### Disable web scraping temporarily

```bash
./scripts/toggle-mcp.sh puppeteer off
```

### Toggle planning tools (enable if disabled, vice versa)

```bash
./scripts/toggle-mcp.sh planning-suite toggle
```

### Check what's currently enabled

```bash
jq '.mcpServers | map(select(.enabled==true) | .command)' .mcp.json
```

Or in the toggle script output:
```bash
./scripts/toggle-mcp.sh research-suite
# Shows ✓ for enabled, ✗ for disabled
```

---

## Environment Variables

If your MCP servers need credentials, set them before running Claude Code:

```bash
# PostgreSQL
export DATABASE_URL="postgresql://user:pass@localhost/dbname"

# GitHub
export GITHUB_TOKEN="ghp_xxxxxxxxxxxx"

# Supabase
export SUPABASE_URL="https://your-project.supabase.co"
export SUPABASE_ACCESS_TOKEN="your-anon-key"

# Start Claude Code
claude
```

Or create a `.env.local` file in your project and source it before running Claude Code:

```bash
# .env.local (git-ignored)
DATABASE_URL=postgresql://user:pass@localhost/dbname
GITHUB_TOKEN=ghp_xxxxxxxxxxxx

# Then in your shell
source .env.local
claude
```

**Note:** Never commit credentials to `.mcp.json`. Use `${VAR}` placeholders and environment variables instead.

---

## Workflow

### Individual Developer

1. Edit `.mcp.json` or use toggle script to enable servers
2. Exit Claude Code completely
3. Start Claude Code again
4. Use the MCP servers in your conversation

### Team Setup

1. Commit `.mcp.json` to git with all servers defined (disabled by default)
2. Team members clone the repository
3. Each person enables the suites they need: `./scripts/toggle-mcp.sh database-suite on`
4. Start Claude Code, servers load automatically
5. No secrets committed (use `${VAR}` and environment variables)

---

## Troubleshooting

### MCP server not starting
- Check if it's enabled in `.mcp.json`
- Verify environment variables are set: `echo $GITHUB_TOKEN`
- Try restarting Claude Code completely
- Check the error: `claude` (may show MCP error messages)

### "Command not found: npx"
- Install Node.js: `brew install node` (macOS)
- Update npm: `npm install -g npm@latest`

### Environment variables not working
- Make sure to `export VAR=value` before starting Claude Code
- Check syntax: `${VAR}` not `$VAR` in `.mcp.json`
- Verify variable exists: `echo $GITHUB_TOKEN`

### Port conflicts
If multiple MCP servers fail:
```bash
# Find what's using ports
lsof -i :3000

# Kill if needed
kill -9 <PID>
```

---

## Advanced: Manual Configuration

Instead of toggle scripts, you can edit `.mcp.json` directly:

```json
{
  "mcpServers": {
    "postgres": {
      "enabled": true,  // Change to enable/disable
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres"],
      "env": {
        "DATABASE_URL": "${DATABASE_URL}"
      }
    }
  }
}
```

Then restart Claude Code for changes to take effect.

---

## Resources

- **Claude Code Docs**: https://docs.anthropic.com/en/docs/claude-code
- **MCP Documentation**: https://modelcontextprotocol.io/
- **MCP Servers**: https://github.com/modelcontextprotocol/servers
- **Official Registry**: https://registry.modelcontextprotocol.io/

---

## Summary

✅ **Project-based** - `.mcp.json` lives in your repo
✅ **Team-friendly** - Share server configs via git
✅ **Easy toggle** - Use bash or node scripts to enable/disable
✅ **Secure** - No credentials in config (use env vars)
✅ **Ready to use** - Toggle scripts already created, 14 agent suites pre-configured

Start using MCP servers:
```bash
./scripts/toggle-mcp.sh database-suite on
# Restart Claude Code
```
