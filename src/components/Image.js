import React from 'react';
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, drawRegion, customDrawing } from '../actions/Image';
export default class Image extends React.Component {



  componentDidMount() {
    const { dispatch } = this.props;
    const canvas = this.refs.canvas;
    const img = this.refs.image
    dispatch(setCanvas(canvas));
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }
  }

  componentShouldUpdate(nextProps, nextState){
    if(nextProps.location == this.props.location && nextProps.img == this.props.img){
      return false;
    }
    return true;
  }

  componentDidUpdate() {
    const canvas = this.refs.canvas;
    const img = this.refs.image
    const ctx = canvas.getContext("2d");
    img.onload = () => {
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
    const { location, img, buttons, canvas, regions, openDrawing, lines } = this.props;
    return (
      <div>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <canvas onClick={(e) => dispatch(customDrawing(e, canvas, openDrawing, lines))} width="1024" height="768" ref="canvas" className="canvas" />
        <img ref="image" src={`data:image/jpeg;base64,${img}`} className="hidden" />
        {buttons.map((data) => (
          <Button onClick={() => this.updateCanvas(regions[data])} variant="contained" color="tertiary">
            {data}
          </Button>
        ))}
        <Button onClick={() => this.resetCanvas()} style={{ marginLeft : 20 }} variant="contained" color="tertiary">
          Reset
        </Button>
      </div>
    );
  }
}
