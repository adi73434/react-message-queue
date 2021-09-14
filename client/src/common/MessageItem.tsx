import React, {Fragment} from "react";

import styles from "./messageItem.module.css";

interface props {
	text: string,
}


/**
 *
 *
 * @param {props} props
 * @return {*}  {JSX.Element}
 */
const MessageItem = (props: props): JSX.Element => {
	return (
		<div>
			<p>{props.text}</p>
		</div>
	);
};

export default MessageItem;
