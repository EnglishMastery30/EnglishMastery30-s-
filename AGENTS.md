# Project Conventions

## React & JSX
- **Template Literals in JSX Props**: Do not escape backticks in template literals inside JSX props (e.g., do not use `className={\`...\`}`). Use regular backticks (e.g., `className={\`...\`}`) because the Vite/Rollup build system will fail to parse escaped backticks with a Syntax error.

## Skills & CLI
- **Skill Installation Fallbacks**: If `npx skills add <repo> --skill <name>` fails due to authentication or a missing repository, use `npx skills find <name>` to search for alternative sources, or manually implement the requested skill's functionality based on its name and context.
