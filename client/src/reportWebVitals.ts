import {ReportHandler} from "web-vitals";

/**
 * Not sure if return type should be void here.
 *
 * @param {ReportHandler} [onPerfEntry]
 */
const reportWebVitals = (onPerfEntry?: ReportHandler): void => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		import("web-vitals").then(({getCLS, getFID, getFCP, getLCP, getTTFB}) => {
			getCLS(onPerfEntry);
			getFID(onPerfEntry);
			getFCP(onPerfEntry);
			getLCP(onPerfEntry);
			getTTFB(onPerfEntry);
		});
	}
};

export default reportWebVitals;
