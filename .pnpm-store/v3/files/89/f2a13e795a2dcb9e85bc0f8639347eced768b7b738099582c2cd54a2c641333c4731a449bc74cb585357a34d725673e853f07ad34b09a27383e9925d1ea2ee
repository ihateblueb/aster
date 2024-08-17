import { Job, Queue } from 'bull';
import { JobCleanStatus, JobCounts, JobStatus, QueueAdapterOptions, QueueJobOptions, Status } from '../../typings/app';
import { BaseAdapter } from './base';
export declare class BullAdapter extends BaseAdapter {
    queue: Queue;
    constructor(queue: Queue, options?: Partial<QueueAdapterOptions>);
    getRedisInfo(): Promise<string>;
    getName(): string;
    clean(jobStatus: JobCleanStatus, graceTimeMs: number): Promise<any>;
    addJob(name: string, data: any, options: QueueJobOptions): Promise<Job<any>>;
    getJob(id: string): Promise<Job | undefined | null>;
    getJobs(jobStatuses: JobStatus<'bull'>[], start?: number, end?: number): Promise<Job[]>;
    getJobCounts(): Promise<JobCounts>;
    getJobLogs(id: string): Promise<string[]>;
    isPaused(): Promise<boolean>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    empty(): Promise<void>;
    promoteAll(): Promise<void>;
    getStatuses(): Status<'bull'>[];
    getJobStatuses(): JobStatus<'bull'>[];
    private alignJobData;
}
