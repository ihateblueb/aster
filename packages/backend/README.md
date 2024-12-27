# backend

## structure

### cli/

work in progress

### entities/

entities for typeorm. each entity is a postgres table.

### migrations/

migrations to be created for typeorm to run. in the root directory, there's a script in the scripts folder to generate these.

### routes/

generally, if there's one route with the same endpoint but a different method, make the endpoint fit the directory structure as best as you can. (eg. GET `/api/note/:id` is at `routes/api/note/get.ts`)

#### ap/

routes returning activitypub objects or processing them (inbox)

#### api/

local api

#### misc/

generic endpoints that don't start with `/api`. things like prometheus metrics and the uploads static directory code go here.

### services/

most of the important stuff is around here. generally, all the files should have similar structure of creating a class (`SomethindService`) with a bunch of public methods and exporting `new Class();` Not every service can do that, though. For example, the router service has no class.

If a service is for ActivityPub, prefix it with `Ap` and put it in the `ap` subdirectory.
Services for rendering objects should be named `SomethingRenderer` with a single public `render()` process. Be as minimal as possible on required input.
Services for resolving a URL (not many, but `SomethingResolverService` is lengthy) should be named `SomethingResolver`
Services for processing activities delivered to the inbox should be prefixed with `Ap[Activity Type]Processor` and have a single public `process()` method. Other methods can exist on a processor, but must be private. These services also go in the `ap/inbox` subdirectory. More subdirectories can be created in the future if a processor like `Undo` has too many private methods.

### static/

i dont think anything beyong context will ever be put here.

### tests/

work in progress

### types/

not much really goes in here, it's mostly for better autocompletion within IDEs and so there's less repetitive strict string types.

### utils/

avoid creating things here. very generic things like config, db, and redis exist here. authorizedFetch also does, but just because it's middleware for express.

## general notes

The `ObjectLiteral` type is very useful. use it for direct database output that needs to be passed, like an argument on a Renderer service type.
For smaller entities in relations, you can make something like `UserMini(alias?: string)` in `utils/entities`. See how a the NoteService.get() join is for the user of a like.

when using returned value of an Ap service (e.g. ApActorService) in a queue job worker, throw an error if the values return null. it may have just improperly fetched, and the job might be processable at a later time.
