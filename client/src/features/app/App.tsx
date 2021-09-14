import React from "react";
// See: https://reactrouter.com/web/guides/quick-start
import {
	BrowserRouter as Router,
	Link,
	Route,
	Switch,
} from "react-router-dom";


/**
 *
 *
 * @return {*}  {JSX.Element}
 */
const App = (): JSX.Element => {
	return (
		<Router>
			<div>
				hello
				<Link to="/">Home</Link>
				<Link to="/test1">test1</Link>
				<Link to="/test2">test2</Link>
			</div>

			{/* Render component based on first match */}
			<Switch>
				<Route path="/test1">
					{/* <Test1/> */}
				</Route>
				<Route path="/test2">
					{/* <Test2/> */}
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
