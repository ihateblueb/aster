export default class ApNote {
    id: string;

    readonly type: string = "Note";
    
    attributedTo: string;
    actor: string;

    context: string;
    conversation: string;
    
    content: string;
    contentMap: object;
    source: {
        content: string;
        mediaType: string;
    };

    published: string;
    sensitive: boolean;

    inReplyTo?: string;

    to?: Array<string>;
    cc?: Array<string>;
    
    attachment?: Array<object>;
    tag?: Array<object>;

    constructor(grabbedNote) {
        this.id = grabbedNote.ap_id
        this.attributedTo = grabbedNote.author.ap_id
        this.actor = grabbedNote.author.ap_id

        this.content = grabbedNote.content 
        this.source.content = grabbedNote.content
        this.source.mediaType = 'text/x.misskeymarkdown'
    }
}