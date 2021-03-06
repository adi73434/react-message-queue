
/**
 * Convert a JavaScript Date().getTime() item to MySQL DATETIME
 *
 * @param {number} jsDateGetTime
 * @return {*}  {string}
 */
export const jsTimeToMysqlDatetime = (jsDateGetTime: number): string => {
	return new Date(jsDateGetTime).toISOString().slice(0, 19).replace("T", " ");
};
