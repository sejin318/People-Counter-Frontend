import React from 'react';
import WindowSize, { useWindowSize } from "@reach/window-size";
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, drawRegion } from '../actions/Image';
export default class Image extends React.Component {



  componentDidMount() {
    // console.log("image component mounted");
    const { dispatch } = this.props;
    const canvas = this.refs.canvas;
    const img = this.refs.image
    dispatch(setCanvas(canvas));
    const ctx = canvas.getContext("2d");
    // ctx.scale(.25, .25);
    img.onload = () => {
      console.log('width and height of image is: ', img.width, img.height);
      ctx.drawImage(img, 0, 0, 2000, 1000, 0, 0, 1024, 768);
    }
  }



  render() {
    const { location, img, buttons, canvas, regions } = this.props;
    // console.log(regions);
    return (
      <div>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <canvas ref="canvas" className="canvas" />
        <img ref="image" src={`data:image/jpeg;base64,${img}`} className="hidden" />
        {buttons.map((data) => (
          <Button onClick={() => drawRegion(canvas, regions[data])} style={{ marginLeft : 20 }} variant="contained" color="tertiary">
            {data}
          </Button>
        ))}
      </div>
    );
  }
}
