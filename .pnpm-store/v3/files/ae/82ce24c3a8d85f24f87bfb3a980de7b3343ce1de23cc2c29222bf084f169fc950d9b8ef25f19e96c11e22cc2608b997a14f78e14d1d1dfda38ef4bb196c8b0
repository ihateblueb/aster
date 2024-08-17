"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseAdapter = void 0;
class BaseAdapter {
    constructor(type, options = {}) {
        this.formatters = new Map();
        this.readOnlyMode = options.readOnlyMode === true;
        this.allowRetries = this.readOnlyMode ? false : options.allowRetries !== false;
        this.allowCompletedRetries = this.allowRetries && options.allowCompletedRetries !== false;
        this.prefix = options.prefix || '';
        this.description = options.description || '';
        this.type = type;
    }
    getDescription() {
        return this.description;
    }
    setFormatter(field, formatter) {
        this.formatters.set(field, formatter);
    }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    format(field, data, defaultValue = data) {
        const fieldFormatter = this.formatters.get(field);
        return typeof fieldFormatter === 'function' ? fieldFormatter(data) : defaultValue;
    }
}
exports.BaseAdapter = BaseAdapter;
//# sourceMappingURL=base.js.map