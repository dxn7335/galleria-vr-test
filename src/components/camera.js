import {Entity} from 'aframe-react';
import React, { PropTypes } from 'react';

const Camera = (props) => (
  <Entity>
    <Entity camera="" look-controls="" wasd-controls="" {...props}/>
  </Entity>
);

export default Camera;