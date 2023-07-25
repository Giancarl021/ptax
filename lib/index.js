"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Nullable_1 = __importDefault(require("./src/interfaces/Nullable"));
const PTAX_1 = __importDefault(require("./src/interfaces/PTAX"));
const PTAXLoaderInstance_1 = __importDefault(require("./src/interfaces/PTAXLoaderInstance"));
const Api_1 = __importDefault(require("./src/services/Api"));
const constants_1 = __importDefault(require("./src/util/constants"));
/**
 * A service for fetching PTAX dollar data.
 * @param retroactiveLimit The limit of search when a PTAX is not found. Default is `7`.
 * It is not recommended to put this limit too high because each new search will request
 * the API again.
 * @returns A `PTAXLoaderInstance` with methods to fetch the PTAX dollar data.
 */
function PTAXLoader(retroactiveLimit) {
    const api = (0, Api_1.default)();
    const _retroactiveLimit = retroactiveLimit || constants_1.default.api.defaultRetroactiveLimit;
    async function getFromDate(date) {
        if (Number(date) > Date.now())
            throw new Error('Cannot fetch data from future');
        return await api.getPTAXFromDate(date);
    }
    async function getFromDateRetroactively(date) {
        if (Number(date) > Date.now())
            throw new Error('Cannot fetch data from future');
        let currentDate = new Date(date);
        let ptax = null;
        let iterations = 0;
        while (!ptax && iterations < _retroactiveLimit) {
            ptax = await api.getPTAXFromDate(currentDate);
            currentDate.setDate(currentDate.getDate() - 1);
            iterations++;
        }
        if (!ptax)
            throw new Error(`Could not find any PTAX data for ${date.toLocaleString()} and ${_retroactiveLimit} days prior`);
        return ptax;
    }
    return {
        getFromDate,
        getFromDateRetroactively
    };
}
exports.default = PTAXLoader;
