import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import Message from './Message';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([
		{ username: 'Aidil', text: 'Yoo' },
		{ username: 'Jake', text: 'wassup!' },
	]);
	const [username, setUsername] = useState('');

	useEffect(() => {
		setUsername(prompt('Please enter your name'));
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();
		setMessages([...messages, { username, text: input }]);
		setInput('');
	};

	return (
		<div className='App'>
			<h1>Hello Clever Programmers!</h1>
			<h2>Welcome Back {username}!</h2>
			<form>
				<FormControl>
					<InputLabel>Enter a message...</InputLabel>
					<Input value={input} onChange={(event) => setInput(event.target.value)} />
					<Button
						disabled={!input}
						variant='contained'
						color='primary'
						type='submit'
						onClick={sendMessage}
					>
						Send Message
					</Button>
				</FormControl>
			</form>

			{messages.map(({ username, text }) => (
				<Message username={username} text={text} />
			))}
		</div>
	);
}

export default App;
