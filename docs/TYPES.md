# Agent Types

Different types of useful agents:

- Backend-architect (Set up database schema and API’s)
- Backend-developer (Develop and build backend scripts and code)
- Frontend-developer (Create user interface components)
- Payment-integrator (Add Stripe payment processing)
- Deployment-engineer (Set up CI/CD and hosting)

Claude Code Core Production Agents

For production-level enterprise software orchestration in Claude Code, here's the optimal agent setup:
Core Production Agents

1. Architecture Agent
* Reviews system design decisions
* Ensures adherence to enterprise patterns (microservices, event-driven, CQRS)
* Validates scalability and fault tolerance
* Maintains architectural decision records (ADRs)

2. Code Quality & Standards Agent
* Enforces coding standards and best practices
* Runs static analysis and linting
* Ensures consistent patterns across services
* Reviews for security vulnerabilities (OWASP Top 10)

3. Testing & QA Agent
* Writes/maintains unit, integration, and e2e tests
* Ensures test coverage meets thresholds (typically 80%+)
* Validates test pyramid structure
* Manages test data and fixtures

4. DevOps & Infrastructure Agent
* Manages CI/CD pipelines
* Handles containerization (Docker/K8s)
* Infrastructure as Code (Terraform/Pulumi)
* Monitoring and observability setup

5. Security & Compliance Agent
* Security scanning and penetration testing
* Dependency vulnerability checks
* Ensures compliance with regulations (GDPR, SOC2, HIPAA)
* Secrets management validation

6. API & Integration Agent
* API design and versioning strategy
* GraphQL/REST endpoint development
* Service mesh and inter-service communication
* API gateway configuration

7. Database & Data Agent
* Schema design and migrations
* Query optimization
* Data consistency and integrity
* Backup and disaster recovery strategies

8. Documentation Agent
* Maintains technical documentation
* API documentation (OpenAPI/Swagger)
* System diagrams and runbooks
* Onboarding guides

Orchestration Strategy
Lead Orchestrator Agent
* Coordinates between specialized agents
* Manages task delegation and priorities
* Resolves conflicts between agent recommendations
* Maintains overall project context

Key Configuration Tips:
1. Context Sharing: Ensure agents can access shared context files (architecture docs, standards guides)
2. Handoff Points: Define clear boundaries where one agent hands off to another
3. Review Checkpoints: Critical changes reviewed by multiple agents
4. Rollback Procedures: Each agent understands how to safely revert changes
5. Async Communication: Use event-driven patterns for agent coordination

Suggested Tool Stack per Agent:
* Architecture: PlantUML, C4 model diagrams
* Code Quality: ESLint, Prettier, SonarQube
* Testing: Jest, Playwright, k6
* DevOps: GitHub Actions, ArgoCD, Datadog
* Security: Snyk, OWASP ZAP, Vault

This setup provides comprehensive coverage for enterprise development while maintaining clear separation of concerns and enabling effective orchestration.

