/**
 * Representa uma cotação de dólar PTAX, contendo valores de compra e venda.
 */
interface PTAX {
    /**
     * Valor de compra do dólar PTAX em reais
     */
    purchasePrice: number;
    /**
     * Valor de venda do dólar PTAX em reais
     */
    salePrice: number;
    /**
     * Data e hora da cotação
     */
    timestamp: Date;
}
export default PTAX;
