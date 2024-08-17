export type MfmNode = MfmBlock | MfmInline;
export type MfmSimpleNode = MfmUnicodeEmoji | MfmEmojiCode | MfmText;
export type MfmBlock = MfmQuote | MfmSearch | MfmCodeBlock | MfmMathBlock | MfmCenter;
export declare function isMfmBlock(node: MfmNode): node is MfmBlock;
export type MfmQuote = {
    type: 'quote';
    props?: Record<string, unknown>;
    children: MfmNode[];
};
export declare const QUOTE: (children: MfmNode[]) => NodeType<'quote'>;
export type MfmSearch = {
    type: 'search';
    props: {
        query: string;
        content: string;
    };
    children?: [];
};
export declare const SEARCH: (query: string, content: string) => NodeType<'search'>;
export type MfmCodeBlock = {
    type: 'blockCode';
    props: {
        code: string;
        lang: string | null;
    };
    children?: [];
};
export declare const CODE_BLOCK: (code: string, lang: string | null) => NodeType<'blockCode'>;
export type MfmMathBlock = {
    type: 'mathBlock';
    props: {
        formula: string;
    };
    children?: [];
};
export declare const MATH_BLOCK: (formula: string) => NodeType<'mathBlock'>;
export type MfmCenter = {
    type: 'center';
    props?: Record<string, unknown>;
    children: MfmInline[];
};
export declare const CENTER: (children: MfmInline[]) => NodeType<'center'>;
export type MfmInline = MfmUnicodeEmoji | MfmEmojiCode | MfmBold | MfmSmall | MfmItalic | MfmStrike | MfmInlineCode | MfmMathInline | MfmMention | MfmHashtag | MfmUrl | MfmLink | MfmFn | MfmPlain | MfmText;
export type MfmUnicodeEmoji = {
    type: 'unicodeEmoji';
    props: {
        emoji: string;
    };
    children?: [];
};
export declare const UNI_EMOJI: (value: string) => NodeType<'unicodeEmoji'>;
export type MfmEmojiCode = {
    type: 'emojiCode';
    props: {
        name: string;
    };
    children?: [];
};
export declare const EMOJI_CODE: (name: string) => NodeType<'emojiCode'>;
export type MfmBold = {
    type: 'bold';
    props?: Record<string, unknown>;
    children: MfmInline[];
};
export declare const BOLD: (children: MfmInline[]) => NodeType<'bold'>;
export type MfmSmall = {
    type: 'small';
    props?: Record<string, unknown>;
    children: MfmInline[];
};
export declare const SMALL: (children: MfmInline[]) => NodeType<'small'>;
export type MfmItalic = {
    type: 'italic';
    props?: Record<string, unknown>;
    children: MfmInline[];
};
export declare const ITALIC: (children: MfmInline[]) => NodeType<'italic'>;
export type MfmStrike = {
    type: 'strike';
    props?: Record<string, unknown>;
    children: MfmInline[];
};
export declare const STRIKE: (children: MfmInline[]) => NodeType<'strike'>;
export type MfmInlineCode = {
    type: 'inlineCode';
    props: {
        code: string;
    };
    children?: [];
};
export declare const INLINE_CODE: (code: string) => NodeType<'inlineCode'>;
export type MfmMathInline = {
    type: 'mathInline';
    props: {
        formula: string;
    };
    children?: [];
};
export declare const MATH_INLINE: (formula: string) => NodeType<'mathInline'>;
export type MfmMention = {
    type: 'mention';
    props: {
        username: string;
        host: string | null;
        acct: string;
    };
    children?: [];
};
export declare const MENTION: (username: string, host: string | null, acct: string) => NodeType<'mention'>;
export type MfmHashtag = {
    type: 'hashtag';
    props: {
        hashtag: string;
    };
    children?: [];
};
export declare const HASHTAG: (value: string) => NodeType<'hashtag'>;
export type MfmUrl = {
    type: 'url';
    props: {
        url: string;
        brackets?: boolean;
    };
    children?: [];
};
export declare const N_URL: (value: string, brackets?: boolean) => NodeType<'url'>;
export type MfmLink = {
    type: 'link';
    props: {
        silent: boolean;
        url: string;
    };
    children: MfmInline[];
};
export declare const LINK: (silent: boolean, url: string, children: MfmInline[]) => NodeType<'link'>;
export type MfmFn = {
    type: 'fn';
    props: {
        name: string;
        args: Record<string, string | true>;
    };
    children: MfmInline[];
};
export declare const FN: (name: string, args: MfmFn['props']['args'], children: MfmFn['children']) => NodeType<'fn'>;
export type MfmPlain = {
    type: 'plain';
    props?: Record<string, unknown>;
    children: MfmText[];
};
export declare const PLAIN: (text: string) => NodeType<'plain'>;
export type MfmText = {
    type: 'text';
    props: {
        text: string;
    };
    children?: [];
};
export declare const TEXT: (value: string) => NodeType<'text'>;
export type NodeType<T extends MfmNode['type']> = T extends 'quote' ? MfmQuote : T extends 'search' ? MfmSearch : T extends 'blockCode' ? MfmCodeBlock : T extends 'mathBlock' ? MfmMathBlock : T extends 'center' ? MfmCenter : T extends 'unicodeEmoji' ? MfmUnicodeEmoji : T extends 'emojiCode' ? MfmEmojiCode : T extends 'bold' ? MfmBold : T extends 'small' ? MfmSmall : T extends 'italic' ? MfmItalic : T extends 'strike' ? MfmStrike : T extends 'inlineCode' ? MfmInlineCode : T extends 'mathInline' ? MfmMathInline : T extends 'mention' ? MfmMention : T extends 'hashtag' ? MfmHashtag : T extends 'url' ? MfmUrl : T extends 'link' ? MfmLink : T extends 'fn' ? MfmFn : T extends 'plain' ? MfmPlain : T extends 'text' ? MfmText : never;
