import todosReducer from "../features/todos/todosSlice";
import filtersReducer from "../features/filters/filtersSlice";


/**
 *
 *
 * @export
 * @param {*} [state={}]
 * @param {*} action
 * @return {*}  {*}
 */
// export default function rootReducer(state = {}, action: any): any {
// 	// always return a new object for the root state
// 	return {
// 		// the value of `state.todos` is whatever the todos reducer returns
// 		todos: todosReducer(state.todos, action),
// 		// For both reducers, we only pass in their slice of the state
// 		filters: filtersReducer(state.filters, action),
// 	};
// }
