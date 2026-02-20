---
title: Localization
description: >-
  Learn how to contribute translations to Mainsail. This guide covers the translation workflow using Weblate, testing
  translations locally, and validating translation files.
social:
  cards_layout_options:
    title: Localization
---

# Localization

Mainsail uses [vue-i18n](https://kazupon.github.io/vue-i18n/){:target="_blank"} for localization. All locale files are
stored as JSON in the `src/locales/` directory. New strings must always be added to `en.json` first, with keys sorted
alphabetically (enforced by ESLint/Prettier).

## Translate via Weblate

The easiest way to contribute translations is through Weblate, a web-based translation tool with tight version control
integration. It features a clean user interface, propagation of translations across components, and quality checks.

No local setup is required — simply sign in and start translating.

<div markdown="span" style="text-align: center">
[Translate on Weblate :material-translate:](https://hosted.weblate.org/engage/mainsail/){:target="_blank" .md-button .md-button--primary }
</div>

### Translation Status

<figure markdown="span">
[![Weblate translation status](https://hosted.weblate.org/widget/mainsail/horizontal-auto.svg)](https://hosted.weblate.org/engage/mainsail/){:target="_blank"}
</figure>

## Alternative Methods

You can also create or update translations locally using:

- An i18n translation tool such as [BabelEdit](https://www.codeandweb.com/babeledit){:target="_blank"} or
  [i18N-Manager](https://github.com/nicolo-ribaudo/i18n-manager){:target="_blank"}
- [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally){:target="_blank"} extension for
  VSCode

Once your translation is ready, submit it as a
[pull request](https://github.com/mainsail-crew/mainsail/pulls){:target="_blank"}.

## Validate Translations

Mainsail includes `vue-i18n-extract` to check translation files for missing or unused entries:

```bash
npm install
npm run i18n-extract
```

## Test Translations Locally

To verify your translations in the browser, follow the [Development Setup](development-setup.md) guide to start
Mainsail locally. Once the development server is running, you can switch the language in the
**Interface Settings** under **General** to see your changes live.

## Guidelines for Developers

All user-facing text in the codebase must use `$t()` for localization — no hardcoded strings. When adding new UI text:

1. Add the key to `en.json` first.
2. Place it in alphabetical order within the appropriate section.
3. Use the key in your component via `$t('Section.YourNewKey')`.
