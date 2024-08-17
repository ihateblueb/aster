import { MfmInline, MfmNode, MfmText } from '../node';
export declare function mergeText<T extends MfmNode>(nodes: ((T extends MfmInline ? MfmInline : MfmNode) | string)[]): (T | MfmText)[];
export declare function stringifyNode(node: MfmNode): string;
export declare function stringifyTree(nodes: MfmNode[]): string;
export declare function inspectOne(node: MfmNode, action: (node: MfmNode) => void): void;
