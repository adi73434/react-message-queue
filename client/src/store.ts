const initialState = {
	todos: [
		{id: 0, text: "Learn React", completed: true},
		{id: 1, text: "Learn Redux", completed: false, color: "purple"},
		{id: 2, text: "Build something fun!", completed: false, color: "blue"},
	],
	filters: {
		status: "All",
		colors: [],
	},
};



/**
 *
 *
 * @param {*} todos
 * @return {*}  {*}
 */
const nextTodoId = (todos: any): any => {
	const maxId = todos.reduce((maxId: any, todo: any) => Math.max(todo.id, maxId), -1);
	return maxId + 1;
};



/**
 *
 *
 * @export
 * @param {*} [state=initialState]
 * @param {*} action
 * @return {*}  {*}
 */
export default function appReducer(state = initialState, action: any): any {
	// The reducer normally looks at the action type field to decide what happens
	switch (action.type) {
	case "todos/todoAdded": {
		// We need to return a new state object
		return {
			// that has all the existing state data
			...state,
			// but has a new array for the `todos` field
			todos: [
				// with all of the old todos
				...state.todos,
				// and the new todo object
				{
					// Use an auto-incrementing numeric ID for this example
					id: nextTodoId(state.todos),
					text: action.payload,
					completed: false,
				},
			],
		};
	}
	// Do something here based on the different types of actions
	default:
		// If this reducer doesn't recognize the action type, or doesn't
		// care about this specific action, return the existing state unchanged
		return state;
	}
}
