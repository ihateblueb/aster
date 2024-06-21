export default class ActCreate {
    id: string;

    readonly type: 'Create'
    
    object: object;
    published: string;
    to: string[];
    cc: string[];

    constructor(activity) {
        
    }

    build() {
        return this;
    }
}