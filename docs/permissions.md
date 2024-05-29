# Permissions

Permissions can be applied to roles which are given to users. These permissions may be used if authenticated with a token that has them. If a user has a token with a permission but the role does not permit them to use it, they won't be able to.

## Basic

Permissions intended for anyone

### Interact

-   interactAll
-   interactNote (like, repeat,)
-   interactUser (follow)

### Modify

-   modifyAll
-   modifyNote
-   modifyFile (add alt text, set sensitive)
-   modifyProfile

### Create

-   createAll
-   createNote
-   createFile
-   createInvite

### Delete

-   deleteAll
-   deleteNote
-   deleteProfile
-   deleteFile
-   deleteInvite (only own)

## Moderation

Permissions intended for moderators.

### Modify

-   modModifyNote (edit any users notes)
-   modModifyProfile (edit any users profile)
-   modModifyEmoji
-   modModifyBlockedInstances
-   modModifySilencedInstances
-   modModifyBlockedUsers
-   modModifySilencedUsers

### Create

-   modCreateEmoji

### Delete

-   modDeleteNote
-   modDeleteProfile
-   modDeleteInvite
-   modDeleteEmoji
