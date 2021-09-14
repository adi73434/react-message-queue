import React, {Fragment} from "react";
import styles from "./receiver.module.css";

import {TypesZ} from "../../../../types/index";
import {useAppDispatch, useAppSelector} from "../../init/hooks";
import MessageItem from "../../common/MessageItem";
import {addMessage, selectMessages} from "./receiverSlice";

/**
 * This pings the server for new messages and renders them chronologically.
 *
 * @return {*}  {JSX.Element}
 */
const Receiver = (): JSX.Element => {
	const messages = useAppSelector(selectMessages);
	const dispatch = useAppDispatch();

	return (
		<div className={styles.container}>
			I&apos;m the receiver

			{messages.map((msg, idx) => {
				return <MessageItem key={idx} message={msg}></MessageItem>;
				// return msg;
			})}

		</div>
	);
};

export default Receiver;
