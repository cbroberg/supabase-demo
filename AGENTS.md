# Agent Orchestration & Workflow Guide

This document describes the 14 specialized agents available for enterprise software development, their dependencies, and when to use each one.

**Two Workflow Types:**
- **Greenfield Projects** - Building from scratch → Start with `planning-innovation-specialist`
- **Existing Projects** - Working with existing code → Start with `codebase-analyzer`

---

## Existing Project Workflow

When working with an existing codebase, start here instead of the greenfield workflow:

```
                    ┌─────────────────────────────┐
                    │     codebase-analyzer       │
                    │         (sonnet)            │
                    │  Analyze existing codebase  │
                    └─────────────────────────────┘
                                  │
                                  ▼ Project Context
                    ┌─────────────────────────────┐
                    │   Choose Your Next Agent    │
                    │   Based on Your Goal...     │
                    └─────────────────────────────┘
                                  │
        ┌──────────┬──────────┬──────────┬──────────┬──────────┐
        ▼          ▼          ▼          ▼          ▼          ▼
   ┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐┌─────────┐
   │ Add New ││ Review  ││Optimize ││ Add     ││ Improve ││Security │
   │ Feature ││  Code   ││Database ││  Tests  ││  Docs   ││  Audit  │
   └─────────┘└─────────┘└─────────┘└─────────┘└─────────┘└─────────┘
        │          │          │          │          │          │
        ▼          ▼          ▼          ▼          ▼          ▼
   planning   code-review database-  testing-   docs-    security-
   -innov...    -expert   data-expert qa-agent  maintainer compliance
```

**Key Principle:** Always run `codebase-analyzer` first to understand the existing patterns, conventions, and architecture before making changes.

---

## Greenfield Project Workflow

For new projects built from scratch:

```
                                    [PLANNING PHASE]
                                           │
                                           ▼
                            ┌────────────────────────────────┐
                            │ planning-innovation-specialist │
                            │         (opus)                 │
                            │    Creates PRD & Requirements  │
                            └────────────────────────────────┘
                                           │
                                           ▼ PRD
                         ┌─────────────────┴─────────────────┐
                         │                                   │
                         ▼                                   ▼
                [ARCHITECTURE PHASE]                   [DESIGN PHASE]
┌─────────────────────────────────┐    ┌─────────────────────────────┐
│      enterprise-architect       │    │     ui-ux-design-expert     │
│            (opus)               │    │          (sonnet)           │
│  System architecture & ADRs     │    │  Wireframes & Design System │
└─────────────────────────────────┘    └─────────────────────────────┘
                         │                                   │
                         ▼ Architecture                      ▼ Designs
         ┌───────────────┼───────────────┐                   │
         │               │               │                   │
         ▼               ▼               ▼                   │
┌───────────────┐ ┌─────────────┐ ┌─────────────┐            │
│api-integration│ │database-data│ │devops-infra │            │
│  architect    │ │   expert    │ │ structure   │            │
│   (haiku)     │ │  (sonnet)   │ │  (sonnet)   │            │
└───────────────┘ └─────────────┘ └─────────────┘            │
         │               │               │                   │
         └───────────────┼───────────────┘                   │
                         │                                   │
                         ▼                                   ▼
                  [IMPLEMENTATION PHASE]
              ┌─────────────────────────────┐
              │  nextjs-frontend-engineer   │
              │          (sonnet)           │
              │    Implements UI in code    │
              └─────────────────────────────┘
                              │
                              ▼ Code
                    [QUALITY PHASE]
    ┌────────────────┬────────────────┬────────────────┐
    │                │                │                │
    ▼                ▼                ▼                ▼
┌───────────┐    ┌────────────┐   ┌──────────┐   ┌──────────────┐
│ code-     │    │   code-    │   │ testing- │   │  security-   │
│ quality-  │    │  review-   │   │qa-agent  │   │ compliance-  │
│ standards.│    │  expert    │   │ (haiku)  │   │   auditor    │
│ (haiku)   │    │  (haiku)   │   │          │   │   (sonnet)   │
└───────────┘    └────────────┘   └──────────┘   └──────────────┘
    │                 │                │                │
    └─────────────────┴────────────────┴────────────────┘
                              │
                              ▼
                    [DOCUMENTATION PHASE]
              ┌─────────────────────────────┐
              │       docs-maintainer       │
              │          (haiku)            │
              │   API docs, runbooks, etc.  │
              └─────────────────────────────┘
```

## Anytime Agents (No Dependencies)

These agents can be invoked at any point in the workflow:

| Agent | Model | Use When |
|-------|-------|----------|
| **codebase-analyzer** | sonnet | First step on any existing project; understand before changing |
| **web-research-specialist** | sonnet | Need to research technologies, competitors, best practices |
| **security-compliance-auditor** | sonnet | Security review needed at any stage |

---

## Phase Details

### Phase 1: Planning

| Agent | Model | Input | Output |
|-------|-------|-------|--------|
| **planning-innovation-specialist** | opus | User idea/requirements | PRD, feature prioritization, user personas |

**When to use:** Starting a new project, feature, or product from scratch.

**Next steps:** Hand off PRD to enterprise-architect AND ui-ux-design-expert (can run in parallel).

---

### Phase 2: Architecture & Design (Parallel)

These two agents can run **simultaneously** after receiving the PRD:

| Agent | Model | Input | Output |
|-------|-------|-------|--------|
| **enterprise-architect** | opus | PRD | System architecture, ADRs, tech stack decisions |
| **ui-ux-design-expert** | sonnet | PRD, personas | Wireframes, mockups, design system |

**Dependencies:**
- Both receive PRD from planning-innovation-specialist
- Can run in parallel (no dependency on each other)

---

### Phase 3: Detailed Design (Parallel)

These agents can run **simultaneously** after enterprise-architect completes:

| Agent | Model | Input | Output |
|-------|-------|-------|--------|
| **api-integration-architect** | haiku | System architecture | API contracts, OpenAPI specs, versioning strategy |
| **database-data-expert** | sonnet | System architecture | Schema design, migrations, query patterns |
| **devops-infrastructure** | sonnet | System architecture | CI/CD, Docker, Kubernetes, IaC |

**Dependencies:**
- All three receive architecture from enterprise-architect
- Can run in parallel with each other

---

### Phase 4: Implementation

| Agent | Model | Input | Output |
|-------|-------|-------|--------|
| **nextjs-frontend-engineer** | sonnet | Designs + API contracts | React/Next.js components, pages |

**Dependencies:**
- Receives designs from ui-ux-design-expert
- Receives API contracts from api-integration-architect
- Should wait for both before implementing

---

### Phase 5: Quality Assurance (Parallel)

These agents can run **simultaneously** after code is written:

| Agent | Model | Input | Output | Focus |
|-------|-------|-------|--------|-------|
| **code-quality-standards** | haiku | Code | Linting results, metrics | Automated checks |
| **code-review-expert** | haiku | Code | Design feedback | Human-style review |
| **testing-qa-agent** | haiku | Code | Tests, coverage report | Test writing |
| **security-compliance-auditor** | sonnet | Code | Security findings | Vulnerabilities, compliance |

**Dependencies:**
- All require code to be written first
- Can run in parallel with each other
- Can also be run earlier for architecture/design review

---

### Phase 6: Documentation

| Agent | Model | Input | Output |
|-------|-------|-------|--------|
| **docs-maintainer** | haiku | Completed system | API docs, runbooks, onboarding guides |

**Dependencies:**
- Should run after implementation is stable
- Can run incrementally as features complete

---

## Common Scenarios

### Scenario 1: Build a New Feature End-to-End

```
1. planning-innovation-specialist  → PRD
2. enterprise-architect + ui-ux-design-expert  → Architecture + Designs (parallel)
3. api-integration-architect + database-data-expert + devops-infrastructure  → Specs (parallel)
4. nextjs-frontend-engineer  → Implementation
5. code-quality-standards + code-review-expert + testing-qa-agent + security-compliance-auditor  → QA (parallel)
6. docs-maintainer  → Documentation
```

### Scenario 2: Review Existing Code

```
1. code-quality-standards  → Automated linting/metrics
2. code-review-expert  → Design and architecture feedback
3. security-compliance-auditor  → Security vulnerabilities (if handling sensitive data)
```

### Scenario 3: Design a New API

```
1. enterprise-architect  → Define service boundaries and patterns
2. api-integration-architect  → Design API contracts and OpenAPI specs
3. security-compliance-auditor  → Validate API security
```

### Scenario 4: Optimize Database Performance

```
1. database-data-expert  → Query analysis, indexing, schema review
```

### Scenario 5: Set Up Infrastructure

```
1. enterprise-architect  → Define deployment architecture
2. devops-infrastructure  → Implement CI/CD, containers, IaC
3. security-compliance-auditor  → Validate infrastructure security
```

### Scenario 6: Quick Code Quality Check

```
1. code-quality-standards  → Linting and static analysis only
```

### Scenario 7: Thorough Code Review

```
1. code-review-expert  → Design patterns, SOLID principles, readability
2. security-compliance-auditor  → Security review (if needed)
```

### Scenario 8: Research Before Planning

```
1. web-research-specialist  → Market research, competitive analysis, tech evaluation
2. planning-innovation-specialist  → Create PRD with research insights
```

---

## Existing Project Scenarios

### Scenario 9: Onboard to Existing Codebase

```
1. codebase-analyzer  → Understand structure, patterns, tech stack
   Output: Project context document for reference
```

### Scenario 10: Add Feature to Existing Project

```
1. codebase-analyzer  → Understand existing patterns and conventions
2. planning-innovation-specialist  → Define feature requirements (using existing context)
3. enterprise-architect  → Design how feature fits existing architecture
4. [Implementation agents]  → Build following existing patterns
5. [Quality agents]  → Validate against existing standards
```

### Scenario 11: Refactor Existing Code

```
1. codebase-analyzer  → Map current architecture and dependencies
2. code-review-expert  → Identify improvement opportunities
3. enterprise-architect  → Design target architecture (if major refactor)
4. [Implementation]  → Refactor incrementally
5. testing-qa-agent  → Ensure tests pass throughout
```

### Scenario 12: Improve Test Coverage on Existing Code

```
1. codebase-analyzer  → Understand testing patterns in use
2. testing-qa-agent  → Analyze coverage gaps, write missing tests
```

### Scenario 13: Security Audit Existing System

```
1. codebase-analyzer  → Map architecture and data flows
2. security-compliance-auditor  → Full security and compliance audit
3. code-review-expert  → Review flagged areas (if needed)
```

### Scenario 14: Document Existing System

```
1. codebase-analyzer  → Generate architecture overview
2. docs-maintainer  → Create/update API docs, runbooks, guides
```

### Scenario 15: Optimize Existing Database

```
1. codebase-analyzer  → Understand data access patterns
2. database-data-expert  → Query optimization, index recommendations
```

### Scenario 16: Modernize Legacy UI

```
1. codebase-analyzer  → Understand current frontend architecture
2. ui-ux-design-expert  → Design improvements within constraints
3. nextjs-frontend-engineer  → Implement following existing patterns
```

### Scenario 17: Add CI/CD to Existing Project

```
1. codebase-analyzer  → Understand build process, dependencies, environments
2. devops-infrastructure  → Design and implement pipeline
3. security-compliance-auditor  → Validate pipeline security
```

---

## Agent Quick Reference

| Agent | Model | Primary Responsibility |
|-------|-------|----------------------|
| codebase-analyzer | sonnet | **START HERE for existing projects** - analyze codebase |
| planning-innovation-specialist | opus | PRD, requirements, feature prioritization |
| enterprise-architect | opus | System architecture, patterns, ADRs |
| ui-ux-design-expert | sonnet | Wireframes, mockups, design systems |
| api-integration-architect | haiku | API contracts, OpenAPI, versioning |
| database-data-expert | sonnet | Schema design, queries, migrations |
| devops-infrastructure | sonnet | CI/CD, Docker, Kubernetes, IaC |
| nextjs-frontend-engineer | sonnet | React/Next.js implementation |
| code-quality-standards | haiku | Automated linting, static analysis |
| code-review-expert | haiku | Human-style design review |
| testing-qa-agent | haiku | Test writing, coverage |
| security-compliance-auditor | sonnet | Security scanning, compliance |
| docs-maintainer | haiku | API docs, runbooks, guides |
| web-research-specialist | sonnet | Web research, information gathering |

---

## Model Selection Rationale

- **opus** (2 agents): Strategic, complex reasoning - planning and system architecture
- **sonnet** (7 agents): Nuanced decisions - codebase analysis, design, security, databases, infrastructure, frontend, research
- **haiku** (5 agents): Focused, routine tasks - API contracts, linting, reviews, testing, docs

---

## Parallel Execution Summary

| Phase | Agents That Can Run in Parallel |
|-------|--------------------------------|
| Architecture + Design | enterprise-architect, ui-ux-design-expert |
| Detailed Design | api-integration-architect, database-data-expert, devops-infrastructure |
| Quality Assurance | code-quality-standards, code-review-expert, testing-qa-agent, security-compliance-auditor |
| Anytime | codebase-analyzer, web-research-specialist, security-compliance-auditor |

---

## Quick Decision Guide

**"I'm starting a new project from scratch"**
→ Start with `planning-innovation-specialist`

**"I'm working on an existing codebase"**
→ Start with `codebase-analyzer`

**"I just need to review some code"**
→ `code-review-expert` (design) + `code-quality-standards` (automated)

**"I need to check security"**
→ `security-compliance-auditor`

**"I need to research something"**
→ `web-research-specialist`

**"I need to add tests"**
→ `testing-qa-agent`

**"I need to write documentation"**
→ `docs-maintainer`
