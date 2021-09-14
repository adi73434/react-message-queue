import React, {Fragment} from "react";

import {TypesZ} from "../../../types/index";
import {cancelMessage} from "../features/sender/senderSlice";
import {useAppDispatch} from "../init/hooks";

import styles from "./messageItem.module.css";

interface props {
	message: TypesZ.MessageInSenderQueue | TypesZ.MessageFromServer
}


/**
 *
 *
 * @param {props} props
 * @return {*}  {JSX.Element}
 */
const MessageItem = (props: props): JSX.Element => {
	const dispatch = useAppDispatch();

	return (
		<div>
			<p>{props.message.text}</p>
			<button onClick={() => dispatch(cancelMessage(props.message.id))}>Cancel</button>;
		</div>
	);
};

export default MessageItem;
