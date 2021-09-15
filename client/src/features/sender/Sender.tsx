import React, {Fragment, useState} from "react";
import {useStore} from "react-redux";
import MessageItem from "../../common/MessageItem";
import {useAppDispatch, useAppSelector} from "../../init/hooks";
import styles from "./sender.module.css";
import {commitMessage, selectMessages, addMessageToSend} from "./senderSlice";


/**
 * This is the parent interface where the user enters a message,
 * and within this they can also cancel sending the message.
 *
 * Messages are removed from here after being sent, and they then
 * are put into the sentLog
 *
 * @return {*}  {JSX.Element}
 */
const Sender = (): JSX.Element => {
	const messages = useAppSelector(selectMessages);
	const dispatch = useAppDispatch();
	// Just a dumb way of having an id of the sent msg
	const [sendCounter, setSendCounter] = useState(0);
	const [message, setMessage] = useState("");
	return (
		<div className={styles.container}>
			I&apos;m the sender

			{/* Alow typing and use this value for the next sent message. */}
			<input value={message} onChange={(e) => setMessage(e.target.value)}/>

			<button onClick={() => {
				// const count = sendCounter;
				// increment sent ID and add it to send queue
				const msgitem = {id: sendCounter, text: message + sendCounter, sent_date: new Date().getTime(), sending: false};
				console.log("Adding: " + sendCounter);
				dispatch(addMessageToSend(msgitem));
				// NOTE: I tried to put the "check if sending cancelled by user" login here and
				// in the prepareMessageSend reducer, but learnt that that won't work, at least not
				// without a lot more fiddling
				setTimeout(() => {
					// After (x time), check if the user has cancelled this message from sending,
					// if not, send the message
					dispatch(commitMessage(sendCounter));
				}, parseInt(process.env.REACT_APP_MS_TO_SEND_MSG || "5000"));
				setSendCounter(sendCounter + 1);
			}}>Send msg</button>

			{messages.map((msg) => {
				return <MessageItem key={msg.id} message={msg} senderExtras={msg}></MessageItem>;
				// return
			})}
		</div>
	);
};

export default Sender;
