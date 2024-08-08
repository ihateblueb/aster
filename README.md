# Aster

[![Please don't upload to GitHub](https://nogithub.codeberg.page/badge.svg)](https://nogithub.codeberg.page)

Aster is a work-in-progress federated social media software. So far, development is going fine! Please don't use it in production yet.
I don't fully know what I'm doing when it comes to ActivityPub, a lot of this is learning as I go.
I do not expect this software to be extra special, performant, or even stable. If it ends up being somewhat finished, maybe I'll polish it up to be usable.

If you see something that is a bad practice, slow, very stupid, or a security vulnerability, please let me know! You can create an issue in this repo, or contact me directly (see https://blueb.me/) if it's serious.

The frontend is written with Svelte and Sass using mfm.js to parse MFM.
The backend is written with TypeScript using Express, BullMQ, TypeORM, and other important libraries.

Aster extends ActivityPub to make determining note visibility easier. See `docs/extensions.md` for more information.

## Requirements

Aster is developed with the following:

-   PostgreSQL
-   DragonflyDB or Redis
-   NodeJS
-   pnpm
-   libvips
-   ffmpeg

This may be flexible, but hasn't been tested or looked further into.

## Setup

-   an account named "instanceactor" is required

## Planned Features

-   Misskey-like features
    -   Cat ears
    -   Speaking as cat
    -   Emoji reactions
    -   Quote posts
-   mis's biting extension
-   Sharkey profile backgrounds
-   Federated user statuses? (see `docs/planned-extensions.md`)
-   Correct/incorrect poll answers?

## Project Status

Things that work!

### Federation

-   Users can be fetched from other instances
-   Notes can be fetched from other instances
-   You can follow users on Aster from other instances
-   Nodeinfo 2.0 is there
-   Well-known stuff works, too
-   When a note is posted it is announced to followers with Create activity
-   Apply Like and Like with reaction contents
-   Fetch reaction emojis
-   Fetch note emojis
-   Accept and send likes
-   Process incoming hashtags and wafrn hashtags

### Internal API

-   Login works! you can login and get a valid auth token
-   Lookup users by username and get their ids
-   Fetch notes
-   Fetch users
-   Post notes
-   Fetch reactions
-   Fetch emojis in notes
-   Fetch local and global timelines
-   fetch reactions and likes

### Frontend

-   Advanced MFM rendering
-   View notes
-   View profiles
-   Search page
-   Explore page
-   Timelines
-   Virtual scrolling!!
