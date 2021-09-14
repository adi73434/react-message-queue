import React, {Fragment} from "react";
import styles from "./sender.module.css";


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
	return (
		<div className={styles.container}>
			I&apos;m the sender
		</div>
	);
};

export default Sender;
