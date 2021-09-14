import React, {Fragment} from "react";
import styles from "./receiver.module.css";

import {TypesZ} from "../../../../types/index";
import {useAppDispatch, useAppSelector} from "../../init/hooks";
import {store} from "../../init/store";
import MessageItem from "../../common/MessageItem";

/**
 * This pings the server for new messages and renders them chronologically.
 *
 * @return {*}  {JSX.Element}
 */
const Receiver = (): JSX.Element => {
	// const count = useAppSelector(selectCount);
	const dispatch = useAppDispatch();


	return (
		<div className={styles.container}>
			I&apos;m the receiver

			{store.getState().receiver.messages.map((msg, idx) => {
				return <MessageItem key={idx} text={msg.text}></MessageItem>;
			})}

		</div>
	);
};

export default Receiver;
