import React, {Fragment, useState} from "react";
import MessageItem from "../../common/MessageItem";
import {useAppDispatch, useAppSelector} from "../../init/hooks";
import styles from "./sender.module.css";
import {cancelMessage, prepareMessageSend, selectMessages} from "./senderSlice";


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
	const [sendCounter, setsendCounter] = useState(0);

	return (
		<div className={styles.container}>
			I&apos;m the sender

			<button onClick={() => {
				// increment sent ID and add it to send queue
				setsendCounter(sendCounter + 1);
				const msgitem = {id: sendCounter, text: "asdf" + sendCounter, sent_date: new Date().getDate()};
				dispatch(prepareMessageSend(msgitem));
			}}>Send msg</button>

			{messages.map((msg) => {
				return <MessageItem key={msg.id} message={msg}></MessageItem>;
				// return
			})}
		</div>
	);
};

export default Sender;
