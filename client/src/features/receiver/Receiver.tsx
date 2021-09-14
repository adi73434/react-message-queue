import React, {Fragment} from "react";
import styles from "./receiver.module.css";



/**
 * This pings the server for new messages and renders them chronologically.
 *
 * @return {*}  {JSX.Element}
 */
const Receiver = (): JSX.Element => {
	return (
		<div className={styles.container}>
			I&apos;m the receiver
		</div>
	);
};

export default Receiver;
