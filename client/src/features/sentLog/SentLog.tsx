import React, {Fragment} from "react";

import styles from "./sentLog.module.css";



/**
 * This stores all of the sent messages (not persistent).
 *
 * @return {*}  {JSX.Element}
 */
const SentLog = (): JSX.Element => {
	return (
		<div className={styles.container}>
			I&apos;m the sent log
		</div>
	);
};

export default SentLog;
