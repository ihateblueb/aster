import { BullBoardRequest, ControllerHandlerReturnType } from '../../typings/app';
import { BaseAdapter } from '../queueAdapters/base';
export declare function queueProvider(next: (req: BullBoardRequest, queue: BaseAdapter) => Promise<ControllerHandlerReturnType>, { skipReadOnlyModeCheck, }?: {
    skipReadOnlyModeCheck?: boolean;
}): (req: BullBoardRequest) => Promise<ControllerHandlerReturnType>;
