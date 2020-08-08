import React, { useState, useEffect } from 'react';
import './App.css';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import Message from './Message';
import db from './firebase';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	useEffect(() => {
		db.collection('messages').onSnapshot((snapshot) => {
			setMessages(snapshot.docs.map((doc) => doc.data()));
		});
	}, []);

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

			{messages.map((message) => (
				<Message username={username} message={message} />
			))}
		</div>
	);
}

export default App;
