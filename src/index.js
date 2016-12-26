import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import {Entity, Scene} from 'aframe-react';

// Components
import Camera from './components/camera';
import Sky from './components/sky';
import Floor from './components/floor';
import Wall from './components/wall';
import ImageTile from './components/image-tile';

// Utils
import * as ImageUtil from './utils/image-util';

// Styles
import './styles/main.scss';

const wallWidth = 100;
const wallHeight = 120;
const wallDimensions = [
	{ // front
		pos: '0 ' + String(wallHeight/6) + ' ' + String((wallWidth/2)*-1),
		altpos: '0 ' + String(wallHeight/6) + ' ' + String(wallWidth/2),
		rot: '0 0 0'
	},
	{ // right
		pos: String(wallWidth/2) + ' ' + String(wallHeight/6) + ' ' + 0,
		altpos: String((wallWidth/2)*-1) + ' ' + String(wallHeight/6) + ' ' + 0,
		rot: '180 90 180'
	},
	{ // left
		pos: String((wallWidth/2)*-1) + ' ' + String(wallHeight/6) + ' ' + 0,
		altpos: String(wallWidth/2) + ' ' + String(wallHeight/6) + ' ' + 0,
		rot: '0 90 0'
	},
	{	// back
		pos: '0 ' + String(wallHeight/6) + ' ' + String(wallWidth/2),
		altpos: '0 ' + String(wallHeight/6) + ' ' + String((wallWidth/2)*-1),
		rot: '180 0 180'
	}
];

class VRScene extends Component {
	constructor(props){
		super(props);
		this.state = {
			imageSets: this.createWallImageSets(4, 4)
		};
	}

	componentDidMount() {
		this.audio = new Audio('https://a.tumblr.com/tumblr_oiqc4goWg81ro6omro1.mp3');
	}

	startRoom() {
		this.setState({start: true});
		this.startAnimationListeners();
		this.audio.play();
	};

	/* (Workaround) Delay property of aframe animation doesn't work */
	startAnimationListeners() {
		setTimeout(this.startWallAnimation, 18000);
		setTimeout(this.startRoomRotate, 32000);
		setTimeout(this.startCeilingDrop, 33000);
	}

	startRoomRotate = () => this.setState({roomRotate: 1});

	startWallAnimation = () => this.setState({wallAnimation: true});

	startCeilingDrop = () => this.setState({ceilingDrop: true});

	createWallImageSets(setsLimit, imageLimit) {
		const wallImgSets = [];
		let imgIndex = 0;
		for(let i=0; i<setsLimit; i++) {
			let imgSet = Array(imageLimit).fill().map((_, n) => ImageUtil.getImage(imgIndex + n));
			wallImgSets.push( imgSet );
			imgIndex = imgIndex + imageLimit;
		}

		return wallImgSets;
	}

	getRandomColor() {
	  return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
	}

	renderRoom() { 
		const rotation = (this.state.roomRotate) ? {property: 'rotation', dur: 3000, easing: 'linear', delay: 7000, loop: true, to: '0 360 0'} : {};
		console.log(this.state.wallAnimation);
		return (
			<Entity
				ref="room"
				key={this.state.roomRotate || this.state.wallAnimation} //hack
				geometry='primitive: box'
				material={{opacity: 1}}
				animation__rot={rotation}
				>
	      {
	      	wallDimensions.map((wall, i) => {
	      		return (
	      			<Wall 
	      				key={i}
				      	imgSet={this.state.imageSets[i]}
				      	position={wall.pos}
				      	width={wallWidth}
				      	height={wallHeight}
				      	rotation={wall.rot}
				      	color={this.getRandomColor()}
				      	color2={this.getRandomColor()}
				      	altPosition={wall.altpos}
				      	animate={this.state.wallAnimation}
				      />
	      		)
	      	})
	      }
	    </Entity>
		)
	};

	renderStartScreen = () => (
		<div className="start">
			<h1>ALAN GALLERIA</h1>
			<p>If you're on mobile, turn your phone sideways and the volume up to experience this bitch</p>
			<span className="start__btn" onClick={()=>this.startRoom()}>Enter</span>
		</div>
	);

	renderCeiling = () => (
		<Entity
			geometry='primitive: box'
			rotation={'90 90 0'}
			position={'0 ' + String(wallHeight*1.5) + ' 0'}
			animation__pos={{property: 'position', dur: 9000, loop: false, to: '0 30 0'}}
		>
			<ImageTile
				imgsrc={ImageUtil.getRandomImage()}
				width={wallWidth}
				height={wallHeight}
				position={'0 0 1'}
			/>
			<Entity text={{ text: 'Rumple Dumple', size: 7}} position='-7 0 1' />
		</Entity>
	);

	render() {
		const willRenderRoom = (this.state.start) ? this.renderRoom() : this.renderStartScreen();
		const ceilingDrop = (this.state.ceilingDrop) ? this.renderCeiling() : null;
		return (
			<Scene>
				<Camera></Camera>

				<Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

				<Sky color="#FFFFFF" />

				{willRenderRoom}
				{ceilingDrop}

        <Entity
          animation__rot={{property: 'rotation', dur: 2000, loop: true, to: '360 360 360'}}
          animation__sca={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '1.1 1.1 1.1'}}
          geometry='primitive: box'
          material={{color: "#4286f4", opacity: 0.6}}
          position='0 -0.5 -3'>
          <Entity
            animation__scale={{property: 'scale', dir: 'alternate', dur: 100, loop: true, to: '2 2 2'}}
            geometry='primitive: box; depth: 0.2; height: 0.2; width: 0.2'
            material={{color: '#24CAFF'}}/>
        </Entity>

        <Floor color="#EEE" width={wallWidth} height={wallWidth} />
			</Scene>
		);
	}
}

ReactDOM.render(<VRScene/>, document.querySelector('#app'));