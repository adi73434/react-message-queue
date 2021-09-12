const initialState = {
	status: "All",
	colors: [],
};

/**
 *
 *
 * @export
 * @param {*} [state=initialState]
 * @param {*} action
 * @return {*}  {*}
 */
export default function filtersReducer(state = initialState, action: any): any {
	switch (action.type) {
	case "filters/statusFilterChanged": {
		return {
			// Again, one less level of nesting to copy
			...state,
			status: action.payload,
		};
	}
	default:
		return state;
	}
}
