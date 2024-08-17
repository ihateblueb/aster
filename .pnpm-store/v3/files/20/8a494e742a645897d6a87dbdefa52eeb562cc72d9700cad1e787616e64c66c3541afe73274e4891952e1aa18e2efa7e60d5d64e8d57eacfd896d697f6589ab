import { MfmNode, MfmSimpleNode } from './node';
export declare function parse(input: string, opts?: Partial<{
    nestLimit: number;
}>): MfmNode[];
export declare function parseSimple(input: string): MfmSimpleNode[];
export declare function toString(tree: MfmNode[]): string;
export declare function toString(node: MfmNode): string;
export declare function inspect(node: MfmNode, action: (node: MfmNode) => void): void;
export declare function inspect(nodes: MfmNode[], action: (node: MfmNode) => void): void;
export declare function extract(nodes: MfmNode[], predicate: (node: MfmNode) => boolean): MfmNode[];
