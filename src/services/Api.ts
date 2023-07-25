import axios, { AxiosError } from 'axios';

import formatUrl from '@util/formatUrl';
import PTAXResponse from '@interfaces/PTAXResponse';
import PTAX from '@interfaces/PTAX';
import Nullable from '@interfaces/Nullable';

export default function Api() {
    async function getPTAXFromDate(date: Date): Promise<Nullable<PTAX>> {
        const url = formatUrl(date);

        let data: PTAXResponse;

        try {
            const response = await axios.get<PTAXResponse>(url);

            data = response.data;
        } catch (err) {
            const _err = err as AxiosError;
            const message = _err.response?.data
                ? JSON.stringify(_err.response.data)
                : _err.message;
            throw new Error(`Error requesting source API: ${message}`);
        }

        if (!data || !data.value || !data.value.length) return null;

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
            .sort(
                (a, b) =>
                    Math.abs(numberDate - a.timestampNumber) -
                    Math.abs(numberDate - b.timestampNumber)
            )[0];

        const ptax: PTAX = {
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
