import React from 'react';

import { World } from './animation.js';

class Canvas extends React.Component {
  componentDidMount() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    const W = window.innerWidth, H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const world = new World(ctx, W, H);
    world.init();
  }

  render() {
    return (
      <canvas style={this.props.style} id="canvas"></canvas>
    );
  }
}

export { Canvas }