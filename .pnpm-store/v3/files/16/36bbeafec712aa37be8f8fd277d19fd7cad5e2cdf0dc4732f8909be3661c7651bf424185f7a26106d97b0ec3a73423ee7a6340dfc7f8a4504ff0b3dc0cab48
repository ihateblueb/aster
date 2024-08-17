module.exports = {
    /**
     * Injects the custom error handler in the express module before importing / requiring it
     * 
     * @example
     * // You only do this in the main file and once!
     * require('express-custom-error').inject();
     * // Then you do your code same as usual
     * const express = require('express');
     */
    inject: () => {
        const Layer = require('express/lib/router/layer');
        const wrapper = (fn) => ((req, res, next) => {
            try {
                Promise.resolve(fn(req, res, next)).catch(err => next(err));
            } catch (error) {
                next(error)
            }
        });
        Object.defineProperty(Layer.prototype, "handle", {
            enumerable: true,
            get: function () {
                return this.__handle;
            },
            set: function (m) {
                if (m.length != 4) this.__handle = wrapper(m);
                else this.__handle = m;
            }
        });
    },
    /** Example Midleware that handle various errors */
    errorHandler: () => (err, req, res, next) => {
        if (err) {
            let message = 'An error ocurred, try again later';

            try {
                message = err.message;
            } catch (error) {}

            try {
                message = err.json.message;
            } catch (error) {}

            try {
                err.code = err.code;
            } catch (error) {}

            try {
                if (err.sqlState) {
                    if (err.fatal === true) {
                        message = "Database didnt repond correctly, contact server administrator";
                        console.error(err);
                    } else {
                        message = err.sqlMessage;
                    }
                }
            } catch (error) {}

            if (typeof err === 'string')
                message = err;

            if (err.code >= 100 && err.code <= 600)
                err.code = err.code;
            else
                err.code = 400;

            res
                .status(err.code || 400)
                .json({
                    status: false,
                    message
                });
        } else {
            next();
        }
    }
}