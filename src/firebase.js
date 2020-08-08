import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
	apiKey: 'AIzaSyBg7UAqihUKK-ha08UuWHhuwFW2yQVyjyo',
	authDomain: 'facebook-messenger-clone-21fd7.firebaseapp.com',
	databaseURL: 'https://facebook-messenger-clone-21fd7.firebaseio.com',
	projectId: 'facebook-messenger-clone-21fd7',
	storageBucket: 'facebook-messenger-clone-21fd7.appspot.com',
	messagingSenderId: '236911848472',
	appId: '1:236911848472:web:059143870523f14a88e76d',
	measurementId: 'G-1PQKGVD3CP',
});

const db = firebaseApp.firestore();

export default db;
