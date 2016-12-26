import {Entity} from 'aframe-react';
import React, {Component, PropTypes} from 'react';

class ImageTile extends Component {
	render() {
		const {width, height, imgsrc, position, animate} = this.props;
		console.log("image", animate);
		const animationProps = (animate) ? {property: 'scale', dur: 200, dir: 'alternate', loop: true, to:'1.2 1.2 1'} : {};
		return (
		  <Entity
		    geometry={{primitive: 'box', width: width, height: height, depth: 0}}
		    material={{shader: 'flat', src: imgsrc}}
		    position={position}
		    animation__sca={animationProps}
		  />
		);
	}
};

ImageTile.PropTypes = {
	imgsrc: PropTypes.string,
	position: PropTypes.position,
	width: PropTypes.number,
	height: PropTypes.number,
	animate: PropTypes.bool
};

export default ImageTile;