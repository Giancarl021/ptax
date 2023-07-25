import Nullable from '@interfaces/Nullable';
import PTAX from '@interfaces/PTAX';
import PTAXLoaderInstance from '@interfaces/PTAXLoaderInstance';

import Api from '@services/Api';
import constants from '@util/constants';
/**
 * Um serviço para carregar dados do dólar PTAX a partir da API do Banco Central.
 * @param retroactiveLimit O limite de iterações de consultas à API do Banco Central quando
 * uma PTAX de um dia especificado não for encontrada. O valor padrão é `7` (dias). Não é
 * recomendado colocar este limite muito alto, visto que cada iteração solicita novamente à
 * API do Banco Central.
 * @returns Um objeto `PTAXLoaderInstance` que contém métodos para carregar os dados do dólar PTAX.
 */
export default function PTAXLoader(retroactiveLimit?: number): PTAXLoaderInstance {
    const api = Api();
    const _retroactiveLimit =
        retroactiveLimit || constants.api.defaultRetroactiveLimit;

    async function getFromDate(date: Date): Promise<Nullable<PTAX>> {
        if (Number(date) > Date.now())
            throw new Error('Cannot fetch data from future');

        return await api.getPTAXFromDate(date);
    }

    async function getFromDateRetroactively(date: Date): Promise<PTAX> {
        if (Number(date) > Date.now())
            throw new Error('Cannot fetch data from future');

        let currentDate = new Date(date);
        let ptax: Nullable<PTAX> = null;
        let iterations = 0;

        while (!ptax && iterations < _retroactiveLimit) {
            ptax = await api.getPTAXFromDate(currentDate);
            currentDate.setDate(currentDate.getDate() - 1);
            iterations++;
        }

        if (!ptax)
            throw new Error(
                `Could not find any PTAX data for ${date.toLocaleString()} and ${_retroactiveLimit} days prior`
            );

        return ptax!;
    }

    return {
        getFromDate,
        getFromDateRetroactively
    };
}

export { PTAX, PTAXLoaderInstance };
