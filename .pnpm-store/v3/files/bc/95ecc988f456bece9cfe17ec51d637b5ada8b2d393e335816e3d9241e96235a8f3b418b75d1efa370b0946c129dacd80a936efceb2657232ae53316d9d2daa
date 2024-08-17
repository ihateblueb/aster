import { FormatterField, JobCleanStatus, JobCounts, JobStatus, QueueAdapterOptions, QueueJob, QueueJobOptions, QueueType, Status } from '../../typings/app';
export declare abstract class BaseAdapter {
    readonly readOnlyMode: boolean;
    readonly allowRetries: boolean;
    readonly allowCompletedRetries: boolean;
    readonly prefix: string;
    readonly description: string;
    readonly type: QueueType;
    private formatters;
    protected constructor(type: QueueType, options?: Partial<QueueAdapterOptions & {
        allowCompletedRetries: boolean;
    }>);
    getDescription(): string;
    setFormatter<T extends FormatterField>(field: T, formatter: (data: any) => T extends 'name' ? string : any): void;
    format(field: FormatterField, data: any, defaultValue?: any): any;
    abstract clean(queueStatus: JobCleanStatus, graceTimeMs: number): Promise<void>;
    abstract addJob(name: string, data: any, options: QueueJobOptions): Promise<QueueJob>;
    abstract getJob(id: string): Promise<QueueJob | undefined | null>;
    abstract getJobCounts(): Promise<JobCounts>;
    abstract getJobs(jobStatuses: JobStatus[], start?: number, end?: number): Promise<QueueJob[]>;
    abstract getJobLogs(id: string): Promise<string[]>;
    abstract getName(): string;
    abstract getRedisInfo(): Promise<string>;
    abstract isPaused(): Promise<boolean>;
    abstract pause(): Promise<void>;
    abstract resume(): Promise<void>;
    abstract empty(): Promise<void>;
    abstract promoteAll(): Promise<void>;
    abstract getStatuses(): Status[];
    abstract getJobStatuses(): JobStatus[];
}
