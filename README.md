# Aster

Aster is a work in progress federated social networking software.

## Features

- Notes can quote other notes
- Notes can include up to 12 attachments
- Notes can contain MFM, a markdown used by Misskey that allows for a lot of customization.
- Notes can have emoji reactions added to them
- More advanced instance moderation, no "blocked" or "silenced"
    - Every note from an instance can have a specified content warning applied to it
    - Every user from an instance can be marked sensitive automatically
    - Admins can toggle if an instance...
        - can have activities delivered to it
        - if activities from that instance should be accepted
        - if URIs from that instance should be able to be fetched
        - if their instance should return data the other
- Admins can enable a "bubble timeline" that has all the public notes from a list of instances
- Files uploaded by users are always accessible by the Drive
- Users can be marked sensitive
- Users can bite eachother

## Goals

- Support for emoji reactions
- Users being able to bookmark both notes and users

## Setup

Aster is **not** ready for production. If you use it in production, good luck!
If you're looking for development environment setup, look at the contributing section.

- Install dependencies with `pnpm i`
- Copy config from `config/example.yaml` to `config/production.yaml`
- Update config so that the URL, postgres, and redis connection are right
- Run `pnpm migrate`, `pnpm build`, and then `pnpm start`

You can use something like pm2 or make a systemd service to keep it running in the background.

## Contributing

I try to make issues to keep what I've got going on public. If you'd like to contribute, that's a good place to start. There's a more in depth guide in CONTRIBUTING.md.
