# Agent Orchestration & Workflow Guide

## Available Agents

### Discovery & Planning
- **[codebase-analyzer](.claude/agents/codebase-analyzer.md)** - Analyze existing codebases, document structure, identify patterns, and understand tech stacks. Run first when working with existing projects.
- **[planning-innovation-specialist](.claude/agents/planning-innovation-specialist.md)** - Create PRDs, define requirements, prioritize features, and design user flows. Use when starting new projects or features.
- **[web-research-specialist](.claude/agents/web-research-specialist.md)** - Conduct market research, competitive analysis, technology evaluation, and find documentation. Available at any phase.

### Architecture & Design
- **[enterprise-architect](.claude/agents/enterprise-architect.md)** - Design system-wide technical architecture including microservices, resilience patterns, CQRS, and create ADRs. Works with PRDs from planning-innovation-specialist.
- **[api-integration-architect](.claude/agents/api-integration-architect.md)** - Design API contracts, versioning strategies, OpenAPI specifications, and gateway configuration. Focuses on REST/GraphQL/gRPC endpoint design.
- **[ui-ux-design-expert](.claude/agents/ui-ux-design-expert.md)** - Create wireframes, mockups, design systems, and interaction specifications. Receives PRDs and produces designs for frontend implementation.
- **[database-data-expert](.claude/agents/database-data-expert.md)** - Design database schemas, create migrations, optimize queries, and plan disaster recovery. Works with architecture guidance.

### Implementation
- **[nextjs-frontend-engineer](.claude/agents/nextjs-frontend-engineer.md)** - Implement frontend code in Next.js, Tailwind CSS, and Shadcn/UI. Builds production-ready React components from design specifications.
- **[devops-infrastructure](.claude/agents/devops-infrastructure.md)** - Implement CI/CD pipelines, containerization with Docker, Kubernetes deployments, Infrastructure as Code, and monitoring setup.

### Quality & Review
- **[code-quality-standards](.claude/agents/code-quality-standards.md)** - Run automated code quality checks including linting, static analysis, complexity metrics, and pattern consistency validation.
- **[code-review-expert](.claude/agents/code-review-expert.md)** - Provide human-style code review focused on design, SOLID principles, patterns, readability, and maintainability.
- **[testing-qa-agent](.claude/agents/testing-qa-agent.md)** - Write unit, integration, and e2e tests. Analyze coverage and validate test pyramid structure.

### Security & Documentation
- **[security-compliance-auditor](.claude/agents/security-compliance-auditor.md)** - Perform security scanning, vulnerability assessment, and compliance verification (GDPR, SOC2, HIPAA, PCI-DSS). Available at any phase.
- **[docs-maintainer](.claude/agents/docs-maintainer.md)** - Create and maintain API documentation, architecture diagrams, operational runbooks, and onboarding guides.


