import {Entity} from 'aframe-react';
import React, { Component, PropTypes } from 'react';

// Components
import ImageTile from './image-tile';

class Wall extends Component {

	renderImage(imgsrc, index, imgTotal, rows, wallWidth, wallHeight, animate) {
		const TotalPerRow = Math.floor(imgTotal/rows);
		const xIndex = (index < TotalPerRow) ? index : index % TotalPerRow;
		const rowIndex = Math.floor(index/TotalPerRow);
		const width = wallWidth/imgTotal;
		const height = width + 10;
		const xPos = ((wallWidth/TotalPerRow - (width + 10)) * -1) + (xIndex * (width*1.25));
		const yPos = height - (rowIndex * (height*1.15));
		const position = String(xPos) + " " + String(yPos) + " 1";
		return (
			<ImageTile 
				imgsrc={imgsrc}
				position={position}
				width={width}
				height={height}
				key={index}
				animate={animate}
			/>
		); 
	}

	render() {
	const {rotation, position, imgSet, width, height, color, color2, animate} = this.props;
	const rows = 2;
	const animateProps = (animate) ? {property: 'material.color', dur: 1000, dir: 'alternate', loop: true, from: "#fff", from: color, to: color2} : {};
	return (
		<Entity
			geometry={{primitive: 'box', width: width, height: height, depth: 0}}
			material={{shader: 'flat', color: '#fff'}}
			rotation={rotation}
			position={position}
			animation__col={animateProps}
		  >
			{
				imgSet.map((img, i) => {
					return( this.renderImage(img, i, imgSet.length, rows, width, height, animate) );
				}) 
			}
		  </Entity>
	);
	}
}

/*
 *	rotation: 'X Y Z' (by degrees)
 *	position: 'X Y Z' (by meters)
 */
 Wall.PropTypes = {
 		rotation: PropTypes.string,
 		position: PropTypes.string,
 		imgSet: PropTypes.array,
 		width: PropTypes.number,
 		height: PropTypes.number,
 		animate: PropTypes.bool
 }

export default Wall;
