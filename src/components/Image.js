import React from 'react';
import WindowSize, { useWindowSize } from "@reach/window-size";
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, drawRegion } from '../actions/Image';
export default class Image extends React.Component {



  componentDidMount() {
    const { dispatch } = this.props;
    const canvas = this.refs.canvas;
    const img = this.refs.image
    dispatch(setCanvas(canvas));
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      // console.log('width and height of image is: ', img.width, img.height);
      ctx.drawImage(img, 0, 0);
    }
  }

  updateCanvas(data){
    const canvas = this.refs.canvas;
    const img = this.refs.image
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    drawRegion(canvas, data);
  }

  resetCanvas(){
    const canvas = this.refs.canvas;
    const img = this.refs.image
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }



  render() {
    const { location, img, buttons, canvas, regions } = this.props;
    return (
      <div>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <canvas width="1024" height="768" ref="canvas" className="canvas" />
        <img ref="image" src={`data:image/jpeg;base64,${img}`} className="hidden" />
        {buttons.map((data) => (
          <Button onClick={() => this.updateCanvas(regions[data])} style={{ marginLeft : 20 }} variant="contained" color="tertiary">
            {data}
          </Button>
        ))}
      </div>
    );
  }
}
