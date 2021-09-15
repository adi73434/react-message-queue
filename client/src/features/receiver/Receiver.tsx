import React, {Fragment, useEffect} from "react";
import styles from "./receiver.module.css";

import {Typez} from "../../../../types/index";
import {useAppDispatch, useAppSelector} from "../../init/hooks";
import MessageItem from "../../common/MessageItem";
import {addMessage, checkNewMessages, clearMessagesClientAndServer, receiveNewMessages, selectMessages} from "./receiverSlice";

/**
 * This pings the server for new messages and renders them chronologically.
 *
 * @return {*}  {JSX.Element}
 */
const Receiver = (): JSX.Element => {
	const messages = useAppSelector(selectMessages);
	const dispatch = useAppDispatch();

	useEffect(() => {
		const checknewMsgInterval = setInterval(() => {
			dispatch(checkNewMessages());
		}, 1000);
		// I set this one to be shorter because it usually does nothing
		// i.e., doens't even fetch, if there is no neededMessages.
		// And because there's a limit on the return count, I wanted it to
		// fetch new messages relatively quickly
		const getNewMsgInterval = setInterval(() => {
			dispatch(receiveNewMessages());
		}, 500);
		return () => {
			clearInterval(checknewMsgInterval);
			clearInterval(getNewMsgInterval);
		};
	}, []);

	return (
		<div className={styles.container}>
			I&apos;m the receiver
			<br></br>

			<button onClick={() => {
				dispatch(clearMessagesClientAndServer());
			}}>Clear all messages (server + client)</button>

			{messages.map((msg: any, idx: any) => {
				return <MessageItem key={idx} message={msg}></MessageItem>;
			})}

		</div>
	);
};

export default Receiver;
