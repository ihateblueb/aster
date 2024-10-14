# Aster

[![Please don't upload to GitHub](https://nogithub.codeberg.page/badge.svg)](https://nogithub.codeberg.page)
[![Translate Aster](https://weblate.git.gay/widget/aster/locales/svg-badge.svg?native=1)](https://weblate.git.gay/projects/aster/locales/)

Development instance available at https://dev.aster.pages.gay/.

Aster is a work-in-progress federated social media software. I'm rewriting it from the ground up right now.

# Project Status

| Feature                       | Status          | Notes                                                                                                                                  |
|-------------------------------|-----------------|----------------------------------------------------------------------------------------------------------------------------------------|
| AP user fetching              | Partially done  | Profile metadata missing, avatar, banner, and background missing.                                                                      |
| AP note fetching              | Partially done  | Mostly good, just need to figure out direct message cc/to in the database schema and such                                              |
| Sending AP activities         | Not started     | Section will be expended later when this is started                                                                                    |
| Receiving AP activities       | Not started     | The same thing goes for this.                                                                                                          |
| `nodeinfo` & `host-meta`      | Decent          | 2.0 and 2.1 partially implemented, a lot of missing statistics though.                                                                 |
| Webfinger                     | Decent          | Needs testing...                                                                                                                       |
| User registration             | Complete        | Pretty good! I'm really happy with this part of Aster.                                                                                 |
| User login                    | Complete        | Needs further testing but seems good?                                                                                                  |
| Revoking auth tokens          | Poorly done     | Messed up! It's not my #1 thing todo right now though.                                                                                 |
| Automatically expiring tokens | TODO...         | TODO... yeah...                                                                                                                        |
| Creating notes                | Mostly done     | Notes can be created, no media or other attachments yet though                                                                         |
| Viewing notes                 | Done            | Just grabbed from the database like user, and it works just fine :3                                                                    |
| Editing notes                 | Not started     |                                                                                                                                        |
| Liking notes                  | Not started     |                                                                                                                                        |
| Repeating notes               | Not started     |                                                                                                                                        |
| Bookmarking notes             | Not started     |                                                                                                                                        |
| Reporting                     | Not started     | Just reporting, I want one endpoint for multiple types of reports for simplicity.                                                      |
| Getting notification timeline | Not started     |                                                                                                                                        |
| Reading notification(s)       | Not started     |                                                                                                                                        |
| Viewing users                 | Done            | Just grabbing straight from the database and sending. May have a need for other things later, caching maybe? That isn't a now problem. |
| Editing users                 | Not started     |                                                                                                                                        |
| Looking up users              | Needs rewriting | Kind of copied old code, needs review and likely reformatting to fit the new style.                                                    |
| Blocking users                | Not started     |                                                                                                                                        |
| Muting users                  | Not started     |                                                                                                                                        |
| Biting users                  | Not started     | Do I even want to add this? It was kind of annoying on eepy.zone.                                                                      |
| Static uploads directory      | Done            |                                                                                                                                        |
| Getting drive files           | Not started     |                                                                                                                                        |
| Uploading drive files         | Not started     |                                                                                                                                        |
| Processing drive files        | Not started     |                                                                                                                                        |
| Processing remote files       | Not started     |                                                                                                                                        |

# Eventual Goals

-   Being usable (lmao)
-   Somewhat good Mood implementation
-   Mastodon API (dear god)
