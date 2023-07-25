import Nullable from "./Nullable";
import PTAX from "./PTAX";
/**
 * A object with methods to get PTAX dollar data
 */
interface PTAXLoaderInstance {
    /**
     * Get a PTAX dollar quotation for a specific date. Will return `null` if not found.
     * @param date A `Date` with the desired PTAX dollar quotation.
     * @returns A `PTAX` object with the quotation data or `null` if
     * not found for that specific date.
     */
    getFromDate: (date: Date) => Promise<Nullable<PTAX>>;
    /**
     * Get a PTAX dollar quotation for a specific date or a previous date if the
     * date specified return `null`. Will throw if the `retroactiveLimit` is reached when
     * querying.
     * @param date A `Date` with the desired PTAX dollar quotation
     * @returns A `PTAX` object with the quotation data.
     * @throws Error If the number of query iterations reach the `retroactiveLimit`,
     * to avoid an infinite loop of search and potencial ban from the API.
     */
    getFromDateRetroactively: (date: Date) => Promise<PTAX>;
}
export default PTAXLoaderInstance;
