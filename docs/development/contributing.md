---
title: Contributing
description: >-
  Learn how to contribute to Mainsail. This guide covers development setup, code standards, commit messages, and the
  pull request workflow.
social:
  cards_layout_options:
    title: Contributing to Mainsail
---

# Contributing

We welcome contributions to Mainsail! Whether fixing bugs, adding features or improving documentation. Your help is
invaluable. This guide walks you through everything you need to get started.

## What We Accept

- Bug fixes
- New features and improvements
- Documentation updates  
  (separate repository: [mainsail-crew/docs](https://github.com/mainsail-crew/docs){:target="_blank"})
- Translations and localization  
  (more infos in the [Localization Guide](localization.md))

!!! tip
    If you're unsure whether a change would be accepted, open an issue first to discuss it with the maintainers or
    contact us on our [Discord server](https://discord.gg/mainsail){:target="_blank"} in the `#public-dev-talk` channel.

## Development Setup

Before contributing, you'll need to set up a local development environment. Follow the
[Development Setup](development-setup.md) guide to get started.

## Code Standards

We maintain detailed code style guidelines for Agents on your GitHub repository. You can find the full details in
[CODE_STYLE.md](https://github.com/mainsail-crew/mainsail/blob/develop/agent_docs/CODE_STYLE.md){:target="_blank"} and
[VUE_TYPESCRIPT.md](https://github.com/mainsail-crew/mainsail/blob/develop/agent_docs/VUE_TYPESCRIPT.md){:target="_blank"}.
Below is a summary of the key conventions we follow:

| Topic          | Convention                                                              |
|----------------|-------------------------------------------------------------------------|
| **Naming**     | PascalCase for components/types, camelCase for functions/variables      |
| **Components** | Vue Class Component with TypeScript decorators                          |
| **Types**      | Explicit TypeScript types for props, return values, and complex objects |
| **Imports**    | Use `@/` alias (e.g., `import { foo } from '@/store/types'`)            |

### Formatting

We use [Prettier](https://prettier.io/){:target="_blank"} to enforce consistent formatting (4-space indent, single
quotes, no semicolons, 120 char width). Every PR is automatically checked by a GitHub Workflow.

```bash
npm run format
```

### Linting

We use [ESLint](https://eslint.org/){:target="_blank"} to statically analyze the codebase. This is also checked
automatically in every PR.

```bash
npm run lint:fix
```

### Testing

Run unit tests before submitting your PR:

```bash
npm run test:unit
```

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/){:target="_blank"} specification. A commit
message should include a type and a brief description:

```
type(scope): message
```

The scope is optional but recommended for clarity.

| Type       | Usage                                       |
|------------|---------------------------------------------|
| `feat`     | New feature or functionality                |
| `fix`      | Bug fix                                     |
| `docs`     | Documentation or README chagnes             |
| `refactor` | Code refactoring without changing behavior  |
| `style`    | Formatting changes                          |
| `test`     | Adding or updating tests                    |
| `chore`    | Maintenance tasks, dependency updates, etc. |

### Examples

```
feat(console): add auto-scroll toggle
fix(webcam): resolve stream reconnection issue
docs: update contributing guide
```

## Submitting a Pull Request

### 1. Fork and Clone

Fork the [Mainsail repository](https://github.com/mainsail-crew/mainsail){:target="_blank"} on GitHub, then clone your
fork:

```bash
git clone https://github.com/YOUR-USERNAME/mainsail.git
cd mainsail
```

### 2. Create a Branch

Always create a new branch from `develop` for your work:

```bash
git checkout develop
git checkout -b your-feature-branch
```

!!! warning
    Submit PRs against the `develop` branch, not `master`.

### 3. Make Your Changes

Implement your changes and make sure they pass formatting, linting, and tests:

```bash
npm run format
npm run lint:fix
npm run test:unit
```

### 4. Commit and Push

Stage and commit your changes using a
[Conventional Commits](https://www.conventionalcommits.org/){:target="_blank"} message:

```bash
git add .
git commit -m "feat: add new feature"
git push origin your-feature-branch
```

### 5. Open a Pull Request

Go to the Mainsail repository on GitHub and open a Pull Request from your branch. In your PR, include:

- **PR Title** — Must follow the Conventional Commits format. Since we use squash and merge, the PR title becomes the
  final commit message.
- **Problem Description** — Clearly describe the issue or feature your PR addresses.
- **Solution Overview** — Provide an overview of the changes and the reasoning behind them.
- **How to Test** — Include instructions on how to test your changes.
- **Screenshots** — Upload screenshots or GIFs for UI changes.
- **Linked Issues** — Reference any related issues (e.g., `Closes #123`).

### 6. Respond to Feedback

Maintainers will review your PR. Be prepared to make adjustments based on feedback. Once approved, your changes will be
merged into the project.
