import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// I have a feeling this shouldn't be nested here, but oh well
import App from "./features/app/App";
import reportWebVitals from "./reportWebVitals";
import {Provider} from "react-redux";
// Based off of the create-react-app structure, but I renamed it because I was getting confused
// with the other app folder, lol
import {store} from "./init/store";

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
