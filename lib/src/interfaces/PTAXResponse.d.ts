export interface PTAXResponseValue {
    cotacaoCompra: number;
    cotacaoVenda: number;
    dataHoraCotacao: string;
}
interface PTAXResponse {
    '@odata.context': string;
    value: PTAXResponseValue[];
}
export default PTAXResponse;
