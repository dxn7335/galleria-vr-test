import {Entity} from 'aframe-react';
import React from 'react';

const Floor = (props) => (
  <Entity
    geometry={{primitive: 'plane', width: props.width, height: props.height}}
    material={{shader: 'flat', color: props.color}}
    rotation="-90 0 0"
    position='0 -15 -3'
   />
);

export default Floor;