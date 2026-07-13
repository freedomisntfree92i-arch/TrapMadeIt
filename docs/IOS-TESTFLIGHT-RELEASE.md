# iOS TestFlight Release Pipeline (TrapMadeIt)

This guide documents the full path from this repo to an installable iPhone app distributed through TestFlight.

## 1) Prerequisites

- Apple Developer account (paid) with access to App Store Connect.
- App record in App Store Connect for bundle ID `com.trapmadeit.app` (or your final ID).
- Public HTTPS backend API URL (phone builds cannot use localhost).
- macOS build environment for Xcode archive/signing.
  - You can use a local Mac or a macOS cloud CI provider.

## 2) Project Setup (already scaffolded in this repo)

- Capacitor config: `capacitor.config.ts`
- iOS helper scripts in `package.json`:
  - `npm run ios:prepare`
  - `npm run ios:sync`
  - `npm run ios:open`
- iOS env example: `.env.ios.example`

## 3) Configure Production API

1. Copy `.env.ios.example` to `.env.production`.
2. Set your hosted API origin (no `/api` suffix), for example:

```env
VITE_API_ORIGIN=https://api.trapmadeit.com
```

3. Build web assets:

```bash
npm run build
```

## 4) Create/Sync iOS Project

Install dependencies and sync Capacitor assets:

```bash
npm install
npm run ios:sync
```

If iOS platform is not yet added in your environment:

```bash
npx cap add ios
npm run ios:sync
```

## 5) Build and Upload (macOS + Xcode)

1. Open iOS project:

```bash
npm run ios:open
```

2. In Xcode:
- Select the `App` target.
- Set Team, Signing Certificate, and Provisioning Profile.
- Confirm bundle identifier matches App Store Connect.
- Set version/build number.

3. Archive and upload:
- `Product` -> `Archive`
- In Organizer: `Distribute App` -> `App Store Connect` -> `Upload`

## 6) TestFlight Distribution

1. In App Store Connect -> TestFlight:
- Wait for processing to complete.
- Add internal testers first for immediate install.
- Add external testers when ready (requires Beta App Review).

2. Share invite link or add tester emails.

## 7) Release Checklist

- API endpoint is HTTPS and reachable from mobile networks.
- Auth/session flows tested on real iPhone.
- Gameplay, purchases, and profile sync tested on device.
- Privacy labels and app metadata filled in App Store Connect.
- Crash-free smoke pass completed before inviting stakeholders.

## 8) CI Recommendation

Use a macOS CI job that performs:

1. `npm ci`
2. `npm run build`
3. `npx cap sync ios`
4. Xcode archive + TestFlight upload using App Store Connect API key

This gives repeatable, one-command releases once signing is configured.
