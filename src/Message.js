import React from 'react';

function Message({ text, username }) {
	return (
		<div>
			<h1>
				{username}: {text}
			</h1>
		</div>
	);
}

export default Message;
