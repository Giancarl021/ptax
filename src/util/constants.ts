export default {
    api: {
        baseUrl:
            'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@d)',
        queryTemplate: '$format=json&@d=%',
        defaultRetroactiveLimit: 7
    } as const
} as const;
