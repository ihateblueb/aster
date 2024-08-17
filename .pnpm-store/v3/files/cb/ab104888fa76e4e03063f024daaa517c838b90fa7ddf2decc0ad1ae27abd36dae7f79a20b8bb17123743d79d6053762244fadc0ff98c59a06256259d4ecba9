import { Job, Queue } from 'bullmq';
import { JobCleanStatus, JobCounts, JobStatus, QueueAdapterOptions, QueueJobOptions, Status } from '../../typings/app';
import { BaseAdapter } from './base';
export declare class BullMQAdapter extends BaseAdapter {
    private queue;
    constructor(queue: Queue, options?: Partial<QueueAdapterOptions>);
    getRedisInfo(): Promise<string>;
    getName(): string;
    clean(jobStatus: JobCleanStatus, graceTimeMs: number): Promise<void>;
    addJob(name: string, data: any, options: QueueJobOptions): Promise<Job<any, any, string>>;
    getJob(id: string): Promise<Job | undefined>;
    getJobs(jobStatuses: JobStatus[], start?: number, end?: number): Promise<Job[]>;
    getJobCounts(): Promise<JobCounts>;
    getJobLogs(id: string): Promise<string[]>;
    isPaused(): Promise<boolean>;
    pause(): Promise<void>;
    resume(): Promise<void>;
    empty(): Promise<void>;
    promoteAll(): Promise<void>;
    getStatuses(): Status[];
    getJobStatuses(): JobStatus[];
}
