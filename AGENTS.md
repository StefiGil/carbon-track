# Codex Behavior Rules

## Approval Policy
- Before making ANY file edit, show the exact diff and wait for explicit user approval.
- Never apply changes automatically. Always ask: "Do you want me to apply this change?"
- If multiple files need to be edited, show all diffs together before asking for approval.
- If unsure about scope of changes, ask a clarifying question before proceeding.

## Allowed without asking
- Reading files
- Searching the codebase (grep, glob, find)
- Running `git status`, `git diff`, `git log`

## Never do without approval
- Editing or creating any file
- Running `git add`, `git commit`, `git push`
- Running `npm install`, `npm run`, or any script
- Deleting files
