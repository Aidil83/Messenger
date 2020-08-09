import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Button, InputLabel, Input, FormControl } from '@material-ui/core';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
	const [input, setInput] = useState('');
	const [messages, setMessages] = useState([]);
	const [username, setUsername] = useState('');

	useEffect(() => {
		db.collection('messages')
			.orderBy('timestamp', 'asc')
			.onSnapshot((snapshot) => {
				setMessages(snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() })));
			});
	}, []);

	useEffect(() => {
		setUsername(prompt('Please enter your name'));
	}, []);

	const sendMessage = (event) => {
		event.preventDefault();
		db.collection('messages').add({
			message: input,
			username: username,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setInput('');
	};

	const messagesEndRef = useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
	};

	useEffect(scrollToBottom);

	return (
		<div className='App'>
			<img
				src='https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100'
				alt=''
			/>
			<h1>Facebook Messenger</h1>
			<h2>Welcome Back {username}!</h2>
			<form className='app__form'>
				<FormControl className='app__formControl'>
					<Input
						className='app__input'
						placeholder='Enter a message...'
						value={input}
						onChange={(event) => setInput(event.target.value)}
					/>
					<IconButton
						className='app__iconButton'
						disabled={!input}
						variant='contained'
						color='primary'
						type='submit'
						onClick={sendMessage}
					>
						<SendIcon />
					</IconButton>
				</FormControl>
			</form>
			<FlipMove>
				{messages.map(({ id, message }) => (
					<Message key={id} username={username} message={message} />
				))}
			</FlipMove>
			<div ref={messagesEndRef} />
		</div>
	);
}

export default App;
