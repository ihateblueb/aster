# Aster

[![Translate Aster](https://weblate.git.gay/widget/aster/locales/svg-badge.svg?native=1)](https://weblate.git.gay/projects/aster/locales/)

Aster is a federated microblogging software (heavily in development) intending to include the fun features of software like Misskey and also the practical features of software like Mastodon.

I also intend to have a somewhat good quality codebase with limited repetition and similar style throughout.

Development instance (sometimes) available at https://dev.aster.pages.gay/. It's run through a Cloudflare tunnel and is on my computer, so it's only up when I'm working on it.

## Requirements

-   NodeJS
-   pnpm
-   PostgreSQL
-   DragonflyDB

Latest of all of these are best

## Setup

Install dependencies with `pnpm i` and then build with `pnpm build`.\
Afterward, copy `./config/example.ini` to `./config/production.ini` and update it to your liking.\
It is recommended you set the logging to fancy during initial setup.\
After configuration, run `pnpm migrate` to set up your database, and then you're good to go!\
Run `pnpm start` and your instance will start up.

## Project Status

### AP

-   Notes can be fetched
-   Actors can be fetched
-   Follower and following collection endpoints exist, and are a messy work in progress
-   Likes are accepted, although if they have a reaction the reaction is ignored for now
-   Deletes are accepted, first the User will be tried then Note
-   Follows are accepted, but don't yet work because...
-   Deliver should work in theory but something is off. Looking into it.

### Federation

-   Supports nodeinfo 2.0 and 2.1
-   host-meta works neatly
-   webfinger implemented, and has high tolerance of different formats
-   json and xml supported! for the most part!

### API

-   You can like a note
-   You can create a note with no polls or other attachments
-   You can register
-   You can login
-   You can fetch the instance metadata
-   Fetch user
-   Fetch note

## TODO

-   handle robots.txt from backend, generate from config
-   favicons
-   refactor Store and LocalStore, i shouldnt've capitalized them
