import {Entity} from 'aframe-react';
import React from 'react';

const Sky = (props) => (
  <Entity
    geometry={{primitive: 'sphere', radius: 5000}}
    material={{shader: 'flat', color: props.color}}
    scale="1 1 -1"/>
);

export default Sky;