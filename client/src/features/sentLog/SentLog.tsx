import React, {Fragment} from "react";
import MessageItem from "../../common/MessageItem";
import {useAppDispatch, useAppSelector} from "../../init/hooks";

import styles from "./sentLog.module.css";
import {selectSentMessages} from "./sentLogSlice";



/**
 * This stores all of the sent messages (not persistent).
 *
 * @return {*}  {JSX.Element}
 */
const SentLog = (): JSX.Element => {
	const messages = useAppSelector(selectSentMessages);
	const dispatch = useAppDispatch();

	return (
		<div className={styles.container}>
			I&apos;m the sent log

			{messages.map((msg, idx) => {
				return <MessageItem key={idx} message={msg}></MessageItem>;
			})}
		</div>
	);
};

export default SentLog;
