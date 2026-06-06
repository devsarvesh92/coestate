# Setup guide

Step-by-step setup for CoEstate — documented as we go so it's reproducible and a learning reference.

## Prerequisites

- Node.js 20+ and npm
- Git
- A GitHub account (this project uses the personal account **devsarvesh92**)
- A Vercel account (project already created)
- A Supabase account (created when we reach the data phase)

## 1. Git & GitHub

This repo lives on personal GitHub, separate from any work GitHub. Two things are configured per-repo so the work setup is untouched:

**Identity** (who authors commits) — set locally for this repo only:

```bash
git config --local user.name  "devsarvesh92"
git config --local user.email "sarveshdev92@gmail.com"
```

**Authentication** (how we push) — a dedicated SSH key for personal github.com:

```bash
# Generate a key just for personal GitHub
ssh-keygen -t ed25519 -C "sarveshdev92@gmail.com" -f ~/.ssh/id_ed25519_personal -N ""
```

`~/.ssh/config` routes github.com to that key (kept above any Include so it matches first):

```
Host github.com
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_personal
  IdentitiesOnly yes
```

The public key (`~/.ssh/id_ed25519_personal.pub`) is added at **github.com → Settings → SSH and GPG keys → New SSH key**.

Remote + push:

```bash
git remote add origin git@github.com:devsarvesh92/coestate.git
git push -u origin main
```

Verify auth anytime with: `ssh -T git@github.com` → should greet `Hi devsarvesh92!`.

### Everyday git workflow

```bash
git checkout -b feature/<name>   # branch off main
# ...edit, then:
git add -A
git commit -m "what changed and why"
git push -u origin feature/<name>
gh pr create                      # (if gh is logged into github.com) open a PR
```

Keep `main` stable; do work on branches and merge via Pull Requests.

## 2. Vercel (hosting)

Project: https://vercel.com/sarveshdev92-2642s-projects/coestate

1. **Connect Git:** Vercel → Project → Settings → Git → connect `devsarvesh92/coestate`.
2. After the Next.js app is scaffolded, Vercel auto-detects it (Framework: Next.js) — no manual build config needed.
3. **Environment variables:** Settings → Environment Variables, add the Supabase keys (see ARCHITECTURE.md). Set for Production and Preview.
4. Every push to `main` deploys to production; every PR gets a preview URL.

> Note: until the Next.js app exists, there's nothing for Vercel to build meaningfully — we connect it during the scaffold phase.

## 3. Supabase (database) — upcoming

1. Create a project at https://supabase.com → note the **Project URL** and **anon key** (Settings → API).
2. Create the `properties` and `leads` tables (SQL in ARCHITECTURE.md).
3. Enable Row Level Security and add policies: public `select` on `properties`, public `insert` on `leads`.
4. Put the keys in `.env.local` (local) and Vercel env vars (production).

## 4. Next.js app — upcoming

```bash
# from the repo root
npx create-next-app@latest app --ts --tailwind --app --eslint
npm run dev    # http://localhost:3000
```

Then port the design tokens from `mockup/styles.css` into the Tailwind theme and rebuild the pages as React components.
