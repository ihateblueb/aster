# Aster

[![Translate Aster](https://weblate.git.gay/widget/aster/locales/svg-badge.svg?native=1)](https://weblate.git.gay/projects/aster/locales/)

Aster is a federated microblogging software (heavily in development) intending to include the fun features of software like Misskey and also the practical features of software like Mastodon.

I also intend to have a somewhat good quality codebase with limited repetition and similar style throughout.

Development instance (sometimes) available at https://dev.aster.pages.gay/. It's run through a Cloudflare tunnel and is on my computer, so it's only up when I'm working on it.

## Requirements

- NodeJS
- pnpm
- PostgreSQL
- DragonflyDB

Latest of all of these are best

## Setup

Install dependencies with `pnpm i` and then build with `pnpm build`.\
Afterward, copy `./config/example.ini` to `./config/production.ini` and update it to your liking.\
It is recommended you set the logging to fancy during initial setup.\
After configuration, run `pnpm migrate` to set up your database, and then you're good to go!\
Run `pnpm start` and your instance will start up.

## Project Status

### AP

Endpoints done:

- /user/:id
- /user/:id/inbox
- /note/:id

Endpoints in progress:

- /user/:id/followers (OrderedCollection of following actors)
- /user/:id/following (OrderedCollection of followed actors)
- /user/:id/outbox (OrderedCollection of recently sent public activities. Do I even do this? Does anyone even use it?)

Endpoints needed:

- /note/:id/replies (OrderedCollection of Links to Note objects\*)
- /note/:id/likes (OrderedCollection of Links to Like activities\*)
- /note/:id/shares (OrderedCollection of Links to Announce activities\*)

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

I'm thinking of sending Create(Actor()) to instances with followers to local since I process that

Activities Processed:

- Accept
    - Follow
- Create
    - Note
    - Actor
- Like
    - Note
- Announce
    - Note

### Federation

- Supports nodeinfo 2.0 and 2.1
- host-meta works neatly
- webfinger implemented, and has high tolerance of formatting (eg. resource can be @user@host, user, @user, user@host, etc.)
- json and xml supported! for the most part!

### API

- Get note
- Create notes
- Create notes with replies or quotes
- Create repeats
- Register
- Login
- Get user
- Get instance metadata
- Moderate remote instances (admin)
- Get moderated remote instances (admin)

## TODO

- handle robots.txt from backend, generate from config
- favicon
- try using typeof for some types of validation
- use backfill queue (reply, quote)
