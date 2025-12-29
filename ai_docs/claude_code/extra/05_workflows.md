# Claude Code - Workflows dla Konkretnych Use Cases (2025)

**Źródło:** Wyszukiwanie materiałów z czerwca-grudnia 2025
**Data:** 2025-12-29

---

# Claude Code Workflows & Use Cases: Comprehensive Guide (2025)

## 1. REFACTORING LEGACY CODE WORKFLOW

### Step-by-Step Process:

**Phase 1: Preparation**
1. Organize your repository structure
2. Create a CLAUDE.md file in the root directory with:
   - Tech stack and project structure (WHAT)
   - Project purpose (WHY)
   - How to verify changes and run tests (HOW)
3. For legacy codebases, create a CLAUDE_LEGACY.md file to capture old frameworks and patterns

**Phase 2: Planning**
1. Launch Claude Code in the repository root
2. Use Plan Mode (Shift+Tab twice) to analyze the codebase in read-only mode
3. Define refactoring goals and break them into smaller, focused prompts
4. Create or update a ROADMAP.md outlining goals, batches, and verification gates

**Phase 3: Execution**
1. Work in small batches (10-20 minute chunks that can be tested and reviewed)
2. Extract code incrementally (50 lines here, 40 lines there)
3. Run tests after each step
4. Use checkpoints as instant undo; use Git for reviewable history

**Phase 4: Review & Iterate**
1. Claude proposes changes
2. Review the changes carefully
3. Provide feedback for further improvement
4. Ask Claude to perform code review on its own work

**Performance Results:**
- Refactoring time reduced by approximately 50%
- One developer refactored 23 legacy files in a few hours
- Reduced cyclomatic complexity by an average of 43%
- Extracted 67 reusable utilities

---

## 2. ADDING TESTS TO EXISTING CODEBASES

### Test-Driven Development (TDD) Workflow:

**Step 1: Define Test Cases**
1. Provide Claude with expected input/output pairs
2. Ask Claude to write tests based on these specifications
3. Claude examines existing test files to match style, frameworks, and assertion patterns

**Step 2: Generate Tests**
1. For legacy code: Start with characterization tests
2. Request unit tests for specific modules
3. Claude generates tests following your project's existing patterns and conventions

**Step 3: Execute and Iterate**
1. Run the generated tests
2. Claude evaluates results
3. Claude incrementally improves until tests succeed
4. Fix any failing tests through iterative refinement

**Step 4: Expand Coverage**
1. Gradually increase test coverage
2. Improve testability of legacy code
3. Refactor safely with test protection

**Performance Metrics:**
- Mid-sized module (20 files): Full unit test coverage in ~2 hours instead of 6 hours
- Integration test setup time reduced by ~40% due to generated fixtures and cleanup code

---

## 3. CODE ANALYSIS & COMPETITIVE ANALYSIS

### Code Analysis Workflow:

**Context Management:**
1. Keep context tight using CLAUDE.md and subfolder overrides
2. Use `/clear` often to maintain fresh context
3. Structure CLAUDE.md with file:line references instead of code snippets

**Analysis Process:**
1. Use Plan Mode for deep codebase exploration without making changes
2. Ask Claude to identify patterns and relationships between components
3. Request analysis of:
   - Inconsistent coding patterns (var/let/const usage, function styles)
   - Hardcoded values spread across codebase
   - Architectural inconsistencies
   - Security vulnerabilities

**Competitive Analysis:**
1. Extract competitor ads to find problems and use cases
2. Analyze what copy/assets work
3. Compare different codebases side-by-side
4. Identify best practices and patterns from multiple sources

**Key Capabilities:**
- Claude Code excels at navigating large codebases
- Searches for patterns and understands component relationships
- Identifies logic errors and security issues (not just style nitpicks)

---

## 4. FINDING DIFFERENCES AND INCONSISTENCIES

### Detection Workflow:

**Step 1: Initial Scan**
1. Launch Claude Code in the repository
2. Request a codebase audit for inconsistencies
3. Claude identifies:
   - Mixed coding styles (var/let/const, function declarations)
   - Hardcoded values scattered across files
   - Breaking changes to shared utilities
   - Architectural inconsistencies

**Step 2: Categorize Issues**
1. Group findings by severity and impact
2. Identify patterns of inconsistency
3. Create a prioritized remediation plan

**Step 3: Systematic Resolution**
1. Address inconsistencies in batches
2. Test each batch before moving forward
3. Document resolved patterns in CLAUDE.md

**Context Thresholds:**
- 5,000-10,000 lines: Basic context loss and repetitive suggestions
- 10,000-25,000 lines: Breaking changes to shared utilities
- 25,000+ lines: Architectural inconsistencies requiring major refactoring

---

## 5. BRAINSTORMING AND IDEATION WORKFLOWS

### Ideation Process:

**Product Development:**
1. Ask for ideas at the intersection of different documents (PRDs + customer feedback)
2. Generate product solutions with specific constraints
3. Validate MVPs through simulated debates
4. Time-boxed "What if?" sprints with different constraints

**Creative Workflows:**
1. Upload reference images for locations, props, or mood boards
2. Request descriptions or scene concepts based on visual grounding
3. Brainstorm headlines and explore outline alternatives
4. Conduct supporting research for writing projects

**Business Strategy:**
1. Extract and analyze competitor ads
2. Maintain an ideas backlog where Claude logs random ideas in a structured way
3. Explore solutions, evaluate tradeoffs, challenge assumptions

**Structured Ideation:**
1. Use the brainstorming skill for forced structured dialogue
2. Claude asks intelligent questions to refine requirements
3. Iterative refinement rather than accepting vague requests

**Key 2025 Features:**
- Multimodal capabilities accelerate early-stage ideation
- Claude 4.5 recommended for reflective narration and structured ideation
- Long-context synthesis for complex brainstorming sessions

---

## 6. MIGRATION WORKFLOWS

### Migration Process:

**Phase 1: Planning**
1. Launch Claude in the root of the project
2. Ask Claude to inspect dependencies
3. Request a migration proposal plan
4. Use Plan Mode to analyze and create a detailed plan
5. Create or update ROADMAP.md with goals, batches, and verification gates

**Phase 2: Preparation**
1. Create a clean Git commit on a feature branch before starting
2. Maintain CLAUDE.md with repo-specific conventions
3. Include test commands and how to run lint/type checks
4. For risky steps, ask for a plan first

**Phase 3: Execution in Small Batches**
1. Work in 10-20 minute testable chunks
2. Apply changes incrementally
3. Test and review each batch
4. Commit after each successful batch

**Phase 4: Safety Features**
1. Use automatic code state saves at each step
2. Press Esc twice or use `/rewind` to restore context or code
3. Use checkpoints as instant undo
4. Use Git for reviewable history and PRs

**Specific Migration Types:**
- Framework migrations (e.g., Java to ASP.NET Core)
- Dependency version updates
- Database migrations with schema changes
- Security migrations (RLS, auth updates)

**Best Practice:**
Keep a "batch size" rule of thumb: aim for changes you can test and review within 10-20 minutes, then commit.

---

## 7. DOCUMENTATION GENERATION

### Documentation Workflow:

**Step 1: Code Scanning**
1. Claude scans code for key elements (variables, functions, dependencies)
2. Builds a mental model of the codebase
3. Identifies the main function and traces execution paths
4. Notes inputs, outputs, and potential exceptions

**Step 2: Generation**
1. Claude generates structured docstrings or comments
2. Ensures compliance with project documentation standards
3. Identifies undocumented sections
4. Creates natural language descriptions

**Step 3: Enhancement**
1. Generate module-level docstrings explaining file purposes
2. Add detailed section comments categorizing imports
3. Include inline comments for error handling and key components
4. Refine through iterative prompts (e.g., "Add examples for error handling")

**Advanced Documentation Capabilities:**
- User guides and tutorials from code examples
- Architectural Decision Records (ADRs) from code analysis
- Changelogs from Git history and code changes
- Onboarding documentation for new team members
- Sequence diagrams or flow charts describing execution paths
- Troubleshooting guides based on error handling patterns

**Automated CI/CD Integration:**
- When modifications are detected, Claude can review changes
- Automatically sends PRs with documentation updates
- Self-updating documentation using specialized agents (e.g., Docusaurus-Expert Agent)

---

## 8. ANALIZA KONKURENCJI (COMPETITIVE ANALYSIS)

### Workflow Analizy Konkurencji:

**Krok 1: Zbieranie Danych**
1. Wyodrębnij reklamy konkurencji do znalezienia problemów i use cases
2. Analizuj jakie copy/assets działają
3. Zbierz różne codebases do porównania side-by-side

**Krok 2: Analiza Porównawcza**
1. Użyj Claude Code do identyfikacji najlepszych praktyk z wielu źródeł
2. Porównaj różne podejścia architektoniczne
3. Zidentyfikuj wzorce i różnice w implementacjach

**Krok 3: Wnioski i Rekomendacje**
1. Stwórz raport z kluczowymi spostrzeżeniami
2. Zaproponuj usprawnienia na podstawie analizy konkurencji
3. Udokumentuj odkryte best practices

---

## 9. WYSZUKIWANIE RÓŻNIC (FINDING DIFFERENCES)

### Workflow Wykrywania Różnic:

**Automatyczna Detekcja:**
1. Claude Code skanuje codebase w poszukiwaniu:
   - Mieszanych stylów kodowania
   - Hardcoded values rozrzuconych po plikach
   - Breaking changes w shared utilities
   - Niespójności architektonicznych

**Kategoryzacja i Priorytetyzacja:**
1. Grupuj znaleziska według severity i impact
2. Identyfikuj wzorce niespójności
3. Stwórz plan naprawczy z priorytetami

**Systematyczna Naprawa:**
1. Adresuj niespójności w batchach
2. Testuj każdy batch przed przejściem dalej
3. Dokumentuj rozwiązane wzorce w CLAUDE.md

---

## 10. BURZA MÓZGÓW (BRAINSTORMING)

### Workflow Burzy Mózgów:

**Rozwój Produktu:**
1. Proś o pomysły na przecięciu różnych dokumentów (PRDs + customer feedback)
2. Generuj rozwiązania produktowe z konkretnymi ograniczeniami
3. Waliduj MVPs poprzez symulowane debaty
4. Time-boxed "What if?" sprinty z różnymi constraintami

**Kreatywne Workflow:**
1. Upload obrazów referencyjnych dla lokacji, props, lub mood boards
2. Proś o opisy lub koncepcje scen bazujące na visual grounding
3. Brainstormuj nagłówki i eksploruj alternatywne outline'y
4. Przeprowadzaj supporting research dla projektów pisarskich

**Structured Ideation:**
1. Użyj brainstorming skill dla wymuszonego strukturalnego dialogu
2. Claude zadaje inteligentne pytania żeby doprecyzować wymagania
3. Iteracyjne dopracowywanie zamiast akceptowania vague requests

---

## 11. GENERAL BEST PRACTICES (2025)

### Context Management:
1. Store prompt templates in .claude/commands/ folder for repeated workflows
2. Use `/` to access slash commands
3. Keep CLAUDE.md concise (150-200 instructions maximum)
4. Use file:line references instead of code snippets

### Workflow Structure:
1. **Four-Phase Approach:** Research → Plan → Implement → Validate
2. **Explore-Plan-Code-Commit Cycle** for complex projects
3. Use Plan Mode (Shift+Tab twice) for complex changes
4. Break complex tasks into smaller, verifiable steps

### Permission Modes:
1. Start in Default permission mode to learn approvals
2. Use Plan Mode for read-only exploration and planning
3. Use Auto Mode only after understanding the workflow

### Quality Control:
1. Ask Claude to perform code review on its own work
2. Treat AI output as untrusted until verified
3. Gate merges with tests and human review
4. Use Esc key to interrupt when things go off track

### Performance Optimization:
- Optimized CLAUDE.md boosts test accuracy by 5.19% for general coding
- Repository-specific tasks see 10.87% improvement with proper configuration

---

## 12. SPECIFIC USE CASE WORKFLOWS

### Refactoring Legacy Code
**Typical Timeline:** 50% reduction in refactoring time
**Key Steps:**
1. Use CLAUDE_LEGACY.md to document old patterns
2. Work in 10-20 minute batches
3. Run tests after each batch
4. Extract code incrementally

**Results:**
- 23 legacy files refactored in a few hours
- 43% reduction in cyclomatic complexity
- 67 reusable utilities extracted

### Adding Tests
**Typical Timeline:** 2 hours vs 6 hours for mid-sized module
**Key Steps:**
1. Start with characterization tests for legacy code
2. Provide input/output pairs
3. Claude matches existing test patterns
4. Iterate until tests pass

**Results:**
- 40% reduction in integration test setup time
- Better test coverage than hand-written tests

### Code Analysis
**Key Capabilities:**
- Navigate large codebases efficiently
- Identify patterns and relationships
- Spot logic errors and security issues
- Find architectural inconsistencies

**Use Cases:**
- Security audits
- Code quality assessments
- Architecture reviews
- Technical debt identification

### Migration
**Typical Scenarios:**
- Framework migrations
- Dependency updates
- Database schema changes
- Security upgrades

**Best Practice:** 10-20 minute testable batches with Git commits

### Documentation
**Capabilities:**
- Auto-generated docstrings
- User guides and tutorials
- ADRs from code analysis
- Changelogs from Git history
- Sequence diagrams
- Troubleshooting guides

**CI/CD Integration:** Automated PR creation for documentation updates

---

## 13. ADVANCED WORKFLOWS

### Plan Mode Workflows
**When to Use:**
- Complex multi-file changes
- Exploratory analysis
- Architecture planning
- Risk assessment

**How to Activate:** Shift+Tab twice

**Benefits:**
- Read-only exploration
- No accidental changes
- Deep analysis before implementation
- User approval before execution

### Multi-Agent Workflows
**Parallel Agents:**
- Run multiple agents concurrently
- Each agent handles specific sub-task
- Combine results for comprehensive solutions

**Sequential Agents:**
- Chain agents for complex pipelines
- Each agent's output feeds next agent
- Build sophisticated workflows

### CLAUDE.md Best Practices
**Structure:**
- Tech stack (WHAT)
- Project purpose (WHY)
- How to verify changes (HOW)
- 150-200 instructions maximum
- File:line references, not code snippets

**Maintenance:**
- Update when mistakes occur
- Curate ruthlessly
- Avoid junk drawer syndrome
- Keep only what you actually use

---

## Sources

### Refactoring:
- [Using Claude Code and Aider to Refactor Large Projects](https://codenotary.com/blog/using-claude-code-and-aider-to-refactor-large-projects-enhancing-maintainability-and-scalability)
- [How to Use Claude Code for Refactoring & Clean Code](https://www.arsturn.com/blog/how-to-use-claude-code-to-refactor-and-clean-up-your-codebase)
- [Refactoring with Claude](https://medium.com/@jbelis/refactoring-with-claude-b690a364d2f0)
- [Common workflows - Claude Code Docs](https://code.claude.com/docs/en/common-workflows)
- [Claude AI Development: Best Practices for 2025](https://collabnix.com/claude-code-best-practices-advanced-command-line-ai-development-in-2025/)

### Testing:
- [Claude Code: Best practices for agentic coding](https://www.anthropic.com/engineering/claude-code-best-practices)
- [GitHub - claude-code-workflows](https://github.com/shinpr/claude-code-workflows)
- [Claude Code 2025 Testing Automation Playbook](https://skywork.ai/blog/agent/claude-code-2025-testing-automation-playbook/)
- [Understanding common workflows for Claude Code in 2025](https://www.eesel.ai/blog/common-workflows-claude-code)
- [ClaudeCode Tutorial Center - Test-Driven](https://www.claudecode101.com/en/tutorial/workflows/test-driven)
- [A week with Claude Code](https://dev.to/ujjavala/a-week-with-claude-code-lessons-surprises-and-smarter-workflows-23ip)

### Code Analysis:
- [My 7 essential Claude Code best practices](https://www.eesel.ai/blog/claude-code-best-practices)
- [How I use Claude Code (+ my best tips)](https://www.builder.io/blog/claude-code)
- [Claude Code 2.0 Best Practices for AI Coding](https://skywork.ai/blog/claude-code-2-0-best-practices-ai-coding-workflow-2025/)
- [Getting Good Results from Claude Code](https://www.dzombak.com/blog/2025/08/getting-good-results-from-claude-code/)
- [Mastering the Vibe: Claude Code Best Practices](https://dinanjana.medium.com/mastering-the-vibe-claude-code-best-practices-that-actually-work-823371daf64c)

### Migration:
- [How to Use Claude Code Plugin for Safe Refactoring & Migration](https://skywork.ai/blog/how-to-use-claude-code-plugin-for-refactoring-migration-guide/)
- [Migrating a project from Java to ASP.NET Core](https://medium.com/@deepeesingh/migrating-a-project-from-java-to-asp-net-core-using-claude-code-366a4858a2ef)
- [Database/Code Migrations | Cursor & Claude Code](https://developertoolkit.ai/en/claude-code/lessons/migrations/)

### Documentation:
- [Claude Code Tutorial: How to Generate, Debug and Document Code](https://www.codecademy.com/article/claude-code-tutorial-how-to-generate-debug-and-document-code-with-ai)
- [Can Claude Code Really Generate Professional Documentation](https://apidog.com/blog/claude-code-generate-documentation-from-code/)
- [How I Built a Documentation-Driven Development Workflow](https://dev.to/quochuydev/how-i-built-a-documentation-driven-development-workflow-with-claude-code-1cbb)
- [Automated Documentation with Claude Code](https://medium.com/@dan.avila7/automated-documentation-with-claude-code-building-self-updating-docs-using-docusaurus-agent-2c85d3ec0e19)
- [How to Generate Documentation & Unit Tests](https://skywork.ai/blog/how-to-generate-documentation-unit-tests-claude-code-plugin/)

### Brainstorming:
- [Claude 4.5 Best Practices for Creative Writing, Brainstorming & Ideation](https://skywork.ai/blog/claude-4-5-best-practices-creative-writing-brainstorming-ideation-2025/)
- [Everyone should be using Claude Code more](https://www.lennysnewsletter.com/p/everyone-should-be-using-claude-code)
- [Claude AI for Brainstorming: Advanced 2025 Guide](https://ai-claude.net/for-brainstorming/)
- [Beyond Coding: Your Accountability Buddy](https://dev.to/yooi/beyond-coding-your-accountability-buddy-with-claude-code-skill-4omh)
- [How to Build AI Workflows with Claude Code](https://www.producttalk.org/how-to-build-ai-workflows-with-claude-code/)

### Finding Differences:
- [Your Codebase Is Probably Fighting Claude](https://ambient-code.ai/2025/11/21/your-codebase-is-probably-fighting-claude-part-1/)
- [Claude Code Keeps Breaking My React Code](https://gigamind.dev/blog/ai-breaking-code-claude-code-breaking-react-code)
- [Using CLAUDE.MD files](https://claude.com/blog/using-claude-md-files)
- [Claude Code vs Cursor: Deep Comparison](https://www.qodo.ai/blog/claude-code-vs-cursor/)

### General Workflows:
- [I mastered the Claude Code workflow](https://medium.com/@ashleyha/i-mastered-the-claude-code-workflow-145d25e502cf)
- [The Ultimate Guide to Claude Code](https://medium.com/@tonimaxx/the-ultimate-guide-to-claude-code-production-prompts-power-tricks-and-workflow-recipes-42af90ca3b4a)
- [The Complete Claude Code Operator's Guide](https://medium.com/@lhc1990/the-complete-claude-code-operators-guide-transform-your-development-workflow-with-ai-f29cd4a31e58)
- [Getting Started With Claude Code Workflows](https://www.sidetool.co/post/getting-started-with-claude-code-workflows-a-beginner-s-guide/)
- [GitHub - OneRedOak/claude-code-workflows](https://github.com/OneRedOak/claude-code-workflows)

### Competitive Analysis:
- [Claude Code vs Cursor: Deep Comparison](https://www.qodo.ai/blog/claude-code-vs-cursor/)
- [Claude Code vs Codex: Dev Workflow Comparison](https://dev.to/composiodev/claude-code-vs-codex-dev-workflow-comparison-4jjf)
- [AI Coding Assistant Comparison](https://www.augmentcode.com/guides/ai-coding-assistant-comparison-github-copilot-vs-cursor-vs-claude-code-for-enterprise-development)
- [Two AIs, One Codebase](https://www.starkinsider.com/2025/10/claude-vs-cursor-dual-ai-coding-workflow.html)

### CLAUDE.md Best Practices:
- [Writing a good CLAUDE.md](https://www.humanlayer.dev/blog/writing-a-good-claude-md)
- [Using CLAUDE.MD files: Customizing Claude Code](https://claude.com/blog/using-claude-md-files)
- [CLAUDE.md: Best Practices Learned](https://arize.com/blog/claude-md-best-practices-learned-from-optimizing-claude-code-with-prompt-learning/)
- [Claude Code: Best Practices and Pro Tips](https://htdocs.dev/posts/claude-code-best-practices-and-pro-tips/)

### Plan Mode:
- [ClaudeLog - Plan Mode](https://claudelog.com/mechanics/plan-mode/)
- [Claude Code Best Practices: The Plan Mode](https://cuong.io/blog/2025/07/15-claude-code-best-practices-plan-mode)
- [Claude Code Plan Mode: Revolutionizing the Senior Engineer's Workflow](https://medium.com/@kuntal-c/claude-code-plan-mode-revolutionizing-the-senior-engineers-workflow-21d054ee3420)
- [The Codex-Claude Code Workflow](https://www.nathanonn.com/the-codex-claude-code-workflow-how-i-plan-with-gpt-5-and-execute-with-claude-code/)
- [Plan Mode in Claude Code: When to Use It](https://claude-ai.chat/blog/plan-mode-in-claude-code-when-to-use-it/)
