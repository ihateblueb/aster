# Aster

[![Translate Aster](https://weblate.git.gay/widget/aster/locales/svg-badge.svg?native=1)](https://weblate.git.gay/projects/aster/locales/)

Aster is a federated microblogging software (heavily in development) intending to include the fun features of software like Misskey and also the practical features of software like Mastodon.

I also intend to have a somewhat good quality codebase with limited repetition and similar style throughout.

Development instance (sometimes) available at https://dev.aster.pages.gay/. It's run through a Cloudflare tunnel and is on my computer, so it's only up when I'm working on it.

## Requirements

- NodeJS
- pnpm
- PostgreSQL
- Redis or DragonflyDB

Latest of all of these are best, haven't tested for minimum versions.

## Setup

Install dependencies with `pnpm i` and then build with `pnpm build`.\
Afterward, copy `./config/example.yaml` to `./config/production.yaml` and update it to your liking.\
It is recommended you set the logging to fancy during initial setup.\
After configuration, run `pnpm migrate` to set up your database, and then you're good to go!\
Run `pnpm start` and your instance will start up.

## Project Status

### AP

Endpoints done:

- /user/:id
- /user/:id/inbox
- /note/:id
- /note/:id/activity
- /like/:id

Endpoints in progress:

- /user/:id/followers (Collection of following actors)
- /user/:id/following (Collection of followed actors)

- /user/:id/outbox (Collection of recently sent public activities. Do I even do this? Does anyone even use it? may be good for backfill of notes. maybe just get past public notes and throw /activity at the end so it's all of a user's public Create and Announce activities? like is also fetchable, could do those also)

Endpoints needed:

- /note/:id/replies (Collection of Links to Note objects\*)
- /note/:id/likes (Collection of Links to Like activities\*)
- /note/:id/shares (Collection of Links to Announce activities\*)

\*or entire object with LD signature, to save time on the fetching end. I need to look into the best way to implement this further.

Activities Sent:

- Accept
    - Follow
- Reject
    - Follow
- Create
    - Note
- Like
    - Note
- Announce
    - Note
- Undo
    - Like

I'm thinking of sending Create(Actor()) to instances with followers to local since I process that

Activities Processed:

- Accept
    - Follow
- Announce
    - Note
- Block
- Create
    - Note
    - Actor
- Delete
    - User
    - Note
- Flag
- Like
    - Note
- Reject
    - Follow
- Undo
    - Follow
    - Like
- Update
    - User

Activities that should be processed before first prerelease:

- Update
    - Note
- Like (with content)
- EmojiReact

Activities that should be processed in the future:

- Undo
    - Accept ?
        - Follow ??
    - Announce
- Add
- Remove

### Federation

- Supports nodeinfo 2.0 and 2.1
- host-meta works neatly
- webfinger implemented, and has high tolerance of formatting (eg. resource can be @user@host, user, @user, user@host, etc.)
- json and xml supported! for the most part!

### API

- Get note
- Create notes
- Create notes with replies or quotes
- Like notes
- Delete notes
- Create repeats
- Delete repeats (same as deleting a note)
- Register
- Login
- Get user
- Follow user
- Block user
- Get relationship to/from user
- Refetch remote user
- Get instance metadata
- Get notifications
- Read notifications
- Get timelines
    - home
    - local
    - bubble
    - global
- Refetch user from remote
- Moderate remote instances (admin)
    - toggle accept, return, fetch, and deliver
- Get moderated remote instances (admin)

## TODO

- Processing of incoming emoji

- Emoji on entities (emoji array on Note, User, Poll that joins?? ManyToMany?)

- Fix note attachment joins. Cant it just be a left join?? have i been overthinking it?

- handle robots.txt from backend, generate from config
- favicon

## Development

`devenv up` automatically starts a fresh postgres instance, creates a database and user with the correct permissions, and a redis instance.

`devenv shell` opens a shell with helpful aliases and automatically adjusts which config is used by aster, so you don't have to modify the config to start.

you can use direnv to automatically start the devenv shell when in aster
