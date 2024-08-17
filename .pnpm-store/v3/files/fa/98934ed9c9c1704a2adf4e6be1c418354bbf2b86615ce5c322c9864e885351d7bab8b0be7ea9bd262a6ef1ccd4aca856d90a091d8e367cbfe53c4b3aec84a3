import { BoardOptions, IServerAdapter } from '../typings/app';
import { BaseAdapter } from './queueAdapters/base';
export declare function createBullBoard({ queues, serverAdapter, options, }: {
    queues: ReadonlyArray<BaseAdapter>;
    serverAdapter: IServerAdapter;
    options?: BoardOptions;
}): {
    setQueues: (newBullQueues: readonly BaseAdapter[]) => void;
    replaceQueues: (newBullQueues: readonly BaseAdapter[]) => void;
    addQueue: (queue: BaseAdapter) => void;
    removeQueue: (queueOrName: string | BaseAdapter) => void;
};
