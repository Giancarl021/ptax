# ptax

Carrega dados de compra e venda do dólar PTAX a partir do banco central.

## Por quê?

Ter um pacote simples no NPM que abstrai a conexão com a API do banco central e a busca retroativa de PTAX em caso de dias não comerciais.

## Uso

O pacote provê uma função para criar um carregador de dados:

```typescript
import PTAXLoader from '@giancarl021/ptax';

/**
 * Um serviço para carregar dados do dólar PTAX a partir da API do Banco Central.
 * @param retroactiveLimit O limite de iterações de consultas à API do Banco Central quando
 * uma PTAX de um dia especificado não for encontrada. O valor padrão é `7` (dias). Não é
 * recomendado colocar este limite muito alto, visto que cada iteração solicita novamente à
 * API do Banco Central.
 * @returns Um objeto `PTAXLoaderInstance` que contém métodos para carregar os dados do dólar PTAX.
 */
function PTAXLoader(retroactiveLimit?: number): PTAXLoaderInstance;
```

## Interfaces

O serviço conta com algumas interfaces:

```typescript
/**
 * Uma `generic` que faz um valor poder ser `null` também.
 */
type Nulllable<T> = T | null;

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
```

