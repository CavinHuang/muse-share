import { isString, mdate } from "muse-share";

const mdates = mdate(new Date());

console.log(mdates.get("year"));
console.log(mdates.get("month"));
console.log(mdates.format("YY-M-DD"));
