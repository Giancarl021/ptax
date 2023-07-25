import PTAX from "../interfaces/PTAX";
import Nullable from "../interfaces/Nullable";
export default function Api(): {
    getPTAXFromDate: (date: Date) => Promise<Nullable<PTAX>>;
};
