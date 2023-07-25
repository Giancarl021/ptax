"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const formatUrl_1 = __importDefault(require("../util/formatUrl"));
const PTAXResponse_1 = __importDefault(require("../interfaces/PTAXResponse"));
const PTAX_1 = __importDefault(require("../interfaces/PTAX"));
const Nullable_1 = __importDefault(require("../interfaces/Nullable"));
function Api() {
    async function getPTAXFromDate(date) {
        const url = (0, formatUrl_1.default)(date);
        let data;
        try {
            const response = await axios_1.default.get(url);
            data = response.data;
        }
        catch (err) {
            const _err = err;
            const message = _err.response?.data
                ? JSON.stringify(_err.response.data)
                : _err.message;
            throw new Error(`Error requesting source API: ${message}`);
        }
        if (!data || !data.value || !data.value.length)
            return null;
        const numberDate = Number(date);
        const value = data.value
            .map(value => {
            const timestamp = new Date(`${value.dataHoraCotacao} GMT-3`);
            return {
                ...value,
                timestamp,
                timestampNumber: Number(timestamp)
            };
        })
            .sort((a, b) => Math.abs(numberDate - a.timestampNumber) -
            Math.abs(numberDate - b.timestampNumber))[0];
        const ptax = {
            salePrice: value.cotacaoVenda,
            purchasePrice: value.cotacaoCompra,
            timestamp: value.timestamp
        };
        return ptax;
    }
    return {
        getPTAXFromDate
    };
}
exports.default = Api;
