import React, {Fragment, useEffect, useState} from "react";

import {Typez} from "../../../types/index";
import {removeMessage} from "../features/sender/senderSlice";
import {useAppDispatch} from "../init/hooks";

import styles from "./messageItem.module.css";

interface props {
	// Not sure if this will work how I want, or if it has some big
	// performance implication to pass props twice, however,
	// this essentially gets passed the prop twice.
	// Once is the mssage, with common data,
	// and the second time is with extra bits needed depending
	// on the context.
	// This should probably be done with an if/ternary statement/expression,
	// or by just having two components
	message: Typez.MessageBasic,
	senderExtras?: Typez.MessageInSenderQueue,
	receiverExtras?: Typez.MessageFromServer,
}


/**
 * Show a message item, with some additional options such as cancelling sending,
 * depending on its context.
 *
 * @param {props} props
 * @return {*}  {JSX.Element}
 */
const MessageItem = (props: props): JSX.Element => {
	const dispatch = useAppDispatch();
	const [timeLeftToCancel, setTimeLeftToCancel] = useState(0);

	// Start the checker interval on mount
	useEffect(() => {
		let clearOnLeave = true;
		console.log("asdf");
		// Every few ms update the time left to cancel
		// This should probably be done with a simple decrement or animation rather than reading the props
		// and doing all this
		const checkerInterval = setInterval(() => {
			const timeLeft = checkTimeLeftToCancel(props.message.id);
			// If time left is less than 0 or equal to 0, set the time left to 0, clear the interval,
			// and don't clear the interval on leave
			// NOTE: Now that I think about it, doing this as a ternary operator is probably not very readable
			timeLeft < 0 ? (
				clearInterval(checkerInterval),
				clearOnLeave = false,
				setTimeLeftToCancel(0)
			) : setTimeLeftToCancel(timeLeft);
		}, 50);
		return () => {
			// FIXME: I don't actually know the behaviour of trying to clear an already cleared interval,
			// so I just set a var for it
			clearOnLeave ? clearInterval(checkerInterval) : "";
		};
	}, []);

	/**
	 * This checks the amount of time left to cancel
	 *
	 * @param {number} messageId
	 * @return {*}  {number}
	 */
	const checkTimeLeftToCancel = (messageId: number): number => {
		if (props.senderExtras === undefined) {
			return 0;
		}

		// process.env.x was possibly undefined so I just made it default to "5000" if it is.
		const timeMs = props.senderExtras.sent_date - new Date().getTime() + parseInt(process.env.REACT_APP_MS_TO_SEND_MSG || "5000");

		return timeMs;
	};

	/**
	 *
	 *
	 * @return {*}  {JSX.Element}
	 */
	const showSendingStatus = (): JSX.Element => {
		let ret: JSX.Element = <Fragment/>;

		// If from sender, check stauts
		if (props.senderExtras) {
			ret = props.senderExtras.sending ? <p>Sending...</p> : <p>Waiting...</p>;
		}
		// If not from sender and not from receiver, presume that it's in the sent log.
		// This is very dumb but I'm not going to be expanding on this component... I hope
		else if (!props.receiverExtras) {
			ret = <p>Messaeg Sent</p>;
		}
		return ret;
	};

	return (
		// {setInterval(() => {
		// 	// TypeScript was complaining here...
		// 	props.senderExtras?.id !== undefined ? checkTimeLeftToCancel(props.senderExtras.id) : "";
		// }, 100)}
		<div className={styles.container}>
			<p>{props.message.text}</p>
			<br></br>
			{/* Only show the time to cancel p tag if senderExtras was given */}
			{props.senderExtras?.id !== undefined ?
				<p>Time to cancel: {timeLeftToCancel}</p> :
				""
			}
			<button onClick={() => dispatch(removeMessage(props.message.id))} disabled={props.senderExtras?.sending}>Cancel</button>
			{showSendingStatus()}
		</div>
	);
};

export default MessageItem;
