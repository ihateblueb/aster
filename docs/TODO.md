# todo

## /api/v1/meta

yeah. that endpoint runs 6 sql queries. how about a worker that updates those counts in the meta table hourly so its just the one? that would be cool. also include a "stats_last_updated" or something to show in the frontend because i think thats important.

also. store admins as an array of userids. i want to have multiple admins visible there.

also. add a welcome page thing so admins can choose if they want to put more text there or not.

## roles

on initial setup, the admin role should be created with the admin permission.