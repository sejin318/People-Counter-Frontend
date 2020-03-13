import React from 'react';
import WindowSize, { useWindowSize } from "@reach/window-size";
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, addBox } from '../actions/Image';
export default class Image extends React.Component {



  componentDidMount() {

    // const {segment, box} = this.props;
    const { dispatch } = this.props;
    const canvas = this.refs.canvas;
    const img = this.refs.image
    dispatch(setCanvas(canvas));
    const ctx = canvas.getContext("2d")
    img.onload = () => {
      ctx.scale(.25, .25);
      ctx.drawImage(img, 0, 0);
      // for(let i = 0; i < box; i++){
      //   const point = box[i];
      //   ctx.strokeRect(point[0], point[1], point[2]-point[0], point[3]-point[1]);
      // }
      ctx.strokeRect(10, 10, 100, 100);
    }
  }

  componentDidUpdate() {
    // const {segment, box} = this.props;
    // const canvas = this.refs.canvas;
    // const img = this.refs.image
    // const ctx = canvas.getContext("2d")
    // img.onload = () => {
    //   ctx.scale(.25, .25);
    //   ctx.drawImage(img, 0, 0);
    //   for(let i = 0; i < box; i++){
    //     const point = box[i];
    //     ctx.strokeRect(point[0], point[1], point[2]-point[0], point[3]-point[1]);
    //   }
    //   for(let i = 0; i < box; i++){
    //       ctx.strokeRect(10, 10, 100, 100);
    //   }
    // }

  }


  render() {
    const { location, img, buttons, canvas } = this.props;
    return (
      <div>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <canvas ref="canvas" className="canvas" />
        <img ref="image" src={`data:image/jpeg;base64,${img}`} className="hidden" />
        {buttons.map((data) => (
          <Button onclick={() => addBox(this.props.canvas)} style={{ marginLeft : 20 }} variant="contained" color="tertiary">
            {data}
          </Button>
        ))}
      </div>
    );
  }
}
