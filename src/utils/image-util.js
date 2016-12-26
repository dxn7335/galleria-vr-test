/*
	IMAGE LOADING UTIL
*/
const images = [
	require('../assets/al1.jpg'),
	require('../assets/al3.png'),
	require('../assets/al4.png'),
	require('../assets/al5.png'),
	require('../assets/al6.png'),
	require('../assets/al7.png'),
	require('../assets/al8.png'),
	require('../assets/al9.png'),
	require('../assets/al10.png'),
	require('../assets/al11.png'),
	require('../assets/al12.jpg'),
	require('../assets/al13.png'),
	require('../assets/al14.png'),
	require('../assets/al15.png'),
	require('../assets/al16.png'),
	require('../assets/al17.png'),
	require('../assets/al18.png')
];

export const getRandomImage = () => ( images[ Math.floor(Math.random() * (images.length)) ] );

export const getImage = (index) => ( images[ index ] );