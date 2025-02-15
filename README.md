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

- Install dependencies with `pnpm i`
- Copy config from `config/example.yaml` to `config/production.yaml`
- Update config so that the URL, postgres, and redis connection are right
- Run `pnpm migrate`, `pnpm build`, and then `pnpm start`

You can use something like pm2 or make a systemd service to keep it running in the background.

## Contributing

If you'd like to contribute, for now, it's easier to contact me directly. See https://blueb.pages.gay/#contact or this GitHub profile to contact me.
