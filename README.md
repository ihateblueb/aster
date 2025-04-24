# Aster

Aster is a work in progress federated social networking software.

## Features

- Notes can quote other notes
- Notes can include up to 12 attachments
- Notes can contain MFM, a markdown used by Misskey that allows for a lot of customization.
- Notes can have emoji reactions added to them
- Users can upload files to a drive
- More advanced instance moderation, no "blocked" or "silenced"
    - Every note from an instance can have a specified content warning applied to it
    - Every user from an instance can be marked sensitive automatically
    - Admins can toggle if an instance...
        - can have activities delivered to it
        - if activities from that instance should be accepted
        - if URIs from that instance should be able to be fetched
        - if their instance should return data the other
- Admins can enable a "bubble timeline" that has all the public notes from a list of instances
- Admins can create emojis and categorize them
- Files uploaded by users are always accessible by the Drive
- Users can be marked sensitive
- Users can bite eachother

## Setup

Aster is **not** ready for production. If you use it in production, good luck!

### Prerequisites

- Node (todo: find minimum version)
- pnpm
- yarn
- PostgreSQL (todo: find minimum version)
- Redis (todo: find minimum version) or DragonflyDB (todo: find minimum version)

Use latest available unless otherwise noted. 

### Installation

- Install dependencies with `pnpm i`
- Copy config from `config/example.yaml` to `config/production.yaml`
- Update config so that the URL, postgres, and redis connection are right
- Run `pnpm migrate`, `pnpm build`, and then `pnpm start`

You can use something like pm2 or make a systemd service to keep it running in the background.

## Contributing

If you'd like to contribute, for now, it's easier to contact me directly. See https://blueb.pages.gay/#contact or this GitHub profile to contact me.

## Important Todos

Consistent output of common service methods like create, update, delete, etc. get and getMany are already pretty consistent, but maybe check them all.

The relationship service is a nightmare. I've split it in half, ApRelationshipService and RelationshipService. Needs improvement, along with implementation of accepting follows, getting follow requests, and more.

UserService.follow and UserService.block should probably be moved to the RelationshipService.

Ensure there are no possible conditions where a duplicate relationship can occur. Maybe theres a complicated postgres way to make sure a pair is unique- or maybe add a column for combining the two (like id-id) and add a unique constraint on that.

Consistent route file names and routes is less important, but would be nice for consistency.

ApLockService: Allow adding locks on certain ap ids to avoid multiple jobs accidentally running at the same time for the same thing. Not super likely but possible and annoying when it does happen.
