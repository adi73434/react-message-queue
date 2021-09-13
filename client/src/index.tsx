import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// I have a feeling this shouldn't be nested here, but oh well
import App from "./features/app/App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
// Where the Redux store is. This was the folder location from the create-react-app template,
// and apparently it should be followed alongside the "duck" structure. I don't actually know
// what's sane and what's inane, though.
import {store} from "./app/store";

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
