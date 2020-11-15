import * as dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import updateLocale from "dayjs/plugin/updateLocale";
import "dayjs/locale/es"; // import locale
import { DATE_LOCALE } from "@/utils/constants";

dayjs.locale(DATE_LOCALE);
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
// Uppercase short spanish month names
dayjs.updateLocale(DATE_LOCALE, {
  monthsShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic"
  ]
});
