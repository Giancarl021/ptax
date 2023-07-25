"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _Constants_1 = __importDefault(require("./constants"));
function padNumber(n) {
    return n < 10 ? `0${n}` : String(n);
}
function formatUrl(date) {
    const dateParam = `'${padNumber(date.getMonth() + 1)}-${padNumber(date.getDate())}-${date.getFullYear()}'`;
    return `${_Constants_1.default.api.baseUrl}?${_Constants_1.default.api.queryTemplate.replace(/%/g, dateParam)}`;
}
exports.default = formatUrl;
