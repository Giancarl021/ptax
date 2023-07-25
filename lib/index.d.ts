import PTAX from "./src/interfaces/PTAX";
import PTAXLoaderInstance from "./src/interfaces/PTAXLoaderInstance";
/**
 * A service for fetching PTAX dollar data.
 * @param retroactiveLimit The limit of search when a PTAX is not found. Default is `7`.
 * It is not recommended to put this limit too high because each new search will request
 * the API again.
 * @returns A `PTAXLoaderInstance` with methods to fetch the PTAX dollar data.
 */
export default function PTAXLoader(retroactiveLimit?: number): PTAXLoaderInstance;
export { PTAX, PTAXLoaderInstance };
