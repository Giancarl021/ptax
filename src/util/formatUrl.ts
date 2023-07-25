import constants from '@Constants';

function padNumber(n: number) {
    return n < 10 ? `0${n}` : String(n);
}

export default function formatUrl(date: Date) {
    const dateParam = `'${padNumber(date.getMonth() + 1)}-${padNumber(
        date.getDate()
    )}-${date.getFullYear()}'`;

    return `${constants.api.baseUrl}?${constants.api.queryTemplate.replace(
        /%/g,
        dateParam
    )}`;
}
