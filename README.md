# Aster

[![Please don't upload to GitHub](https://nogithub.codeberg.page/badge.svg)](https://nogithub.codeberg.page)

Original repository is located at [git.gay/blueb/aster](https://git.gay/blueb/aster) but also able to be contributed from [codeberg.org/blueb/aster](https://codeberg.org/blueb/aster).

Aster is a work-in-progress federated social media software. So far, development is going fine! Please don't use it in production yet.
I don't fully know what I'm doing when it comes to ActivityPub, a lot of this is learning as I go.
I do not expect this software to be extra special, performant, or even stable. If it ends up being somewhat finished, maybe I'll polish it up to be usable.

If you see something that is a bad practice, slow, very stupid, or a security vulnerability, please let me know! You can create an issue in this repo, or contact me directly (see https://blueb.me/) if it's serious.

The frontend is written with Svelte and Sass using mfm.js to parse MFM.
The backend is written with TypeScript using Express, BullMQ, TypeORM, and other important libraries.

Aster extends ActivityPub to make determining note visibility easier. See `docs/extensions.md` for more information.

## Requirements

Aster is developed with the following:

PostgreSQL 16.2,
DragonflyDB 1.18 or Redis 6.2.11,
NodeJS 22.2.0,
pnpm 9.1.4

This may be flexible, but hasn't been tested or looked further into.

## Planned Features

-   Misskey-like features
    -   Cat ears
    -   Speaking as cat
    -   Emoji reactions
    -   Quote posts
-   Mia's biting extension
-   Sharkey profile backgrounds
-   Federated user statuses (see `docs/planned-extensions.md`)

## Project Status

Things that work!

### Federation

-   Users can be fetched from other instances
-   Notes can be fetched from other instances
-   You can follow users on Aster from other instances if they do not have follow requests enabled
-   Nodeinfo 2.0 is there
-   Well-known stuff works, too

### Internal API

-   Login works! you can login and get a valid auth token
-   Lookup users by username and get their ids
-   Fetch notes
-   Fetch users

### Frontend

-   Advanced MFM rendering
