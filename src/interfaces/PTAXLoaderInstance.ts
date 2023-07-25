import Nullable from '@interfaces/Nullable';
import PTAX from '@interfaces/PTAX';

/**
 * Um objeto com métodos para carregar os dados de dólar PTAX
 */
interface PTAXLoaderInstance {
    /**
     * Carrega uma cotação de dólar PTAX para uma data específica. Retorna `null` se não
     * encontrado.
     * @param date Um objeto `Date` com a data desejada para obter a cotação.
     * @returns Um objeto `PTAX` com a cotação ou `null` se não encontrado para aquela
     * data específica.
     */
    getFromDate: (date: Date) => Promise<Nullable<PTAX>>;
    /**
     * Carrega uma cotação de dólar PTAX para uma data específica ou a última data com dados
     * caso a data especificada retorne `null`. Dispara um erro caso o `retroactiveLimit` seja
     * atigindo durante a busca.
     * @param date Um objeto `Date` com a data desejada para obter a cotação.
     * @returns Um objeto `PTAX` com a cotação.
     * @throws Error Se o número de iterações na API alcançar o valor de `retroactiveLimit`,
     * para evitar buscas infinitas ou potencial banimento da API.
     */
    getFromDateRetroactively: (date: Date) => Promise<PTAX>;
}

export default PTAXLoaderInstance;
