# Contributing to Gmail to WhatsApp Notifier

Thanks for your interest in improving this project! Contributions of all sizes are welcome - bug reports, documentation fixes, new features, or ideas.

---

## Ways to Contribute

- **Report a bug** - something not working as described in the README
- **Suggest a feature** - e.g. sender/label filters, quiet hours, attachment info
- **Improve documentation** - clearer setup steps, screenshots, troubleshooting tips
- **Submit code** - fixes or enhancements to `code.gs`

---

## Before You Start

1. Check the [existing issues](https://github.com/Virun-L/Gmail-to-WhatsApp/issues) to avoid duplicates.
2. For larger changes, **open an issue first** to discuss the idea before writing code.
3. Small fixes (typos, doc tweaks) can go straight to a pull request.

---

## Reporting Bugs

Please open an issue and include:

- What you expected to happen vs. what actually happened
- Steps to reproduce
- Any error message from the Apps Script **Executions** log (View → Executions)
- Whether you're on the Twilio free/sandbox tier or a paid number

> ⚠️ **Never paste your Twilio SID, Auth Token, phone numbers, or email contents in an issue.** Redact them first.

---

## Development Setup

This project runs on Google Apps Script, so there's no local build step.

1. **Fork** this repository and clone your fork:
   ```bash
   git clone https://github.com/<your-username>/Gmail-to-WhatsApp.git
   cd Gmail-to-WhatsApp
   ```
2. Create a branch for your change:
   ```bash
   git checkout -b feature/short-description
   ```
3. Follow the **Setup Guide** in the [README](README.md) to create your own Apps Script project and Twilio sandbox for testing.
4. Edit the code in the Apps Script editor, test it, then copy your changes back into `code.gs` in your local repo.

**Optional:** use [clasp](https://github.com/google/clasp) (Google's Apps Script CLI) to push/pull code between your local folder and Apps Script instead of copy-pasting.

---

## Testing Your Changes

Before submitting, please confirm:

- [ ] `checkNewEmails` runs manually without errors
- [ ] A test email to your inbox produces a WhatsApp message within a minute or two
- [ ] Emails are not notified twice
- [ ] The time-driven trigger still works after your change
- [ ] Edge cases behave sensibly (empty subject, very long body, non-English text)

---

## Code Guidelines

- Keep everything in `code.gs` unless a split clearly improves readability.
- Use `const` / `let` (not `var`) and descriptive function names.
- Add a short comment above any new function explaining what it does.
- **Never hardcode credentials.** All secrets must be read from `PropertiesService`.
- Leave the placeholders in `setSecrets()` as placeholders — do not commit real values.
- Be mindful of Apps Script quotas (Gmail reads, URL fetches) and Twilio message costs.

---

## Commit Messages

Write short, clear messages in the present tense:

```
Add sender filter option
Fix duplicate notifications for threaded emails
Update README setup steps for Twilio console changes
```

---

## Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/short-description
   ```
2. Open a pull request against the `main` branch of this repo.
3. In the description, explain:
   - **What** you changed
   - **Why** (link the related issue, e.g. `Closes #12`)
   - **How you tested it**
4. Update the README if your change affects setup or customization.

I'll review PRs as soon as I can and may suggest changes before merging.

---

## Code of Conduct

Be respectful, patient, and constructive. Everyone is here to learn and build something useful.

---

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](README.md#license).