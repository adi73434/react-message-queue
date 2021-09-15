import React, {Fragment, useEffect} from "react";
import styles from "./receiver.module.css";

import {Typez} from "../../../../types/index";
import {useAppDispatch, useAppSelector} from "../../init/hooks";
import MessageItem from "../../common/MessageItem";
import {addMessage, checkNewMessages, selectMessages} from "./receiverSlice";

/**
 * This pings the server for new messages and renders them chronologically.
 *
 * @return {*}  {JSX.Element}
 */
const Receiver = (): JSX.Element => {
	const messages = useAppSelector(selectMessages);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const checknewMessageInterval = setInterval(() => {
			// fetch(process.env.REACT_APP_API_URI + "message/list", {
			// 	method: "GET",
			// 	// mode: "cors",
			// 	// credentials: "omit",
			// 	headers: {
			// 		"Accept": "application/json, text/plain, */*",
			// 		"Content-Type": "application/json",
			// 	},
			// })
			// 	.then((response) => response.text())
			// 	.then((data) => {
			// 		console.log(data);
			// 	});
			dispatch(checkNewMessages());
		}, 500);
		return () => {
			clearInterval(checknewMessageInterval);
		};
	}, []);

	return (
		<div className={styles.container}>
			I&apos;m the receiver

			{messages.map((msg: any, idx: any) => {
				return <MessageItem key={idx} message={msg}></MessageItem>;
				// return msg;
			})}

		</div>
	);
};

export default Receiver;
