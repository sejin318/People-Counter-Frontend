import React from 'react';
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, drawRegion, start_drawing, add_line, intersect, reset_line, unlock } from '../actions/Image';
import { ButtonGroup } from '@material-ui/core';
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

  // componentShouldUpdate(nextProps, nextState){
  //   if(nextProps.location == this.props.location && nextProps.img == this.props.img){
  //     return false;
  //   }
  //   return true;
  // }

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

  // userDraw(e){
  //   const { canvas, openDrawing, lines } = this.props;
  //   customDrawing(e, canvas, openDrawing, lines, dispatch);
  // }


  customDrawing(e, canvas, openDrawing, lines, lock) {
    if(lock){
      return;
    }
    const { dispatch } = this.props;
    // console.log('custom drawing called', openDrawing);
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // console.log('x and y are: ', x, y);
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 5;
    if(!openDrawing){
      console.log("opendrawing false! ");
      dispatch(start_drawing());
      dispatch(add_line(x, y));
    } else {
      console.log("opendrawing true!");
      dispatch(add_line(x, y));
      ctx.beginPath();
      ctx.moveTo(lines[lines.length-2], lines[lines.length-1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  finishDrawing(canvas, lines, bbox=[[373, 350, 384, 420], [710, 353, 722, 409], [938, 357, 951, 413]]){
    this.resetCanvas();
    const { dispatch } = this.props;
    const ctx = canvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(lines[0], lines[1]);
    for(let i = 2; i < lines.length; i+=2){
      ctx.lineTo(lines[i], lines[i+1]);
    }
    ctx.fillStyle = 'rgba(0, 0, 255, 0.3)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0)';
    ctx.stroke();
    let total = 0;
    for(let i = 0; i < bbox.length; i++){
      let cross_count = 0;
      let bbox_x = (bbox[i][0]+bbox[i][2])/2;
      let bbox_y = (bbox[i][1]+bbox[i][3])/2;
      for(let j = 0; j < lines.length-2; j+=2){
        if(intersect(lines[j], lines[j+1], lines[j+2], lines[j+3], 0, 0, bbox_x, bbox_y)){
          cross_count++;
        }
      }
      if(intersect(lines[0], lines[1], lines[lines.length-2], lines[lines.length-1], 0, 0, bbox_x, bbox_y)){
        cross_count++;
      }
      if(cross_count & 1){
        total++;
      }
    }
    dispatch(reset_line());
    ctx.font = "20px Arial";
    ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    ctx.fillText("People Count: "+total, 850, 40);
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 3;
    ctx.strokeRect(840, 15, 170, 40);
  }

  render() {
    const { location, img, buttons, canvas, regions, openDrawing, lines, lock, dispatch } = this.props;
    var define_start = false;
    var button;
    if(lock){
      button = (
        <Button onClick={(e) => {this.resetCanvas(); dispatch(unlock());}} style={{ marginLeft : 20 }} variant="contained" color="tertiary">
        Define Region
        </Button>
      );
    } else {
      button = (
        <Button onClick={() => {this.finishDrawing(canvas, lines); }} style={{ marginLeft : 20 }} variant="contained" color="tertiary">
        End Region
        </Button>
      )
    }
    return (
      <div>
      <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
      <canvas onClick={(e) => this.customDrawing(e, canvas, openDrawing, lines, lock)} width="1024" height="768" ref="canvas" className="canvas" />
      <img ref="image" src={`data:image/jpeg;base64,${img}`} className="hidden" />
      <ButtonGroup
              orientation="vertical"
              color="primary"
              aria-label="vertical contained primary button group"
              variant="contained"
            >
      {buttons.map((data) => (
        <Button onClick={() => this.updateCanvas(regions[data])} variant="contained" color="tertiary">
        {data}
        </Button>
      ))}
      {button}
      <Button onClick={() => this.resetCanvas()} style={{ marginLeft : 20 }} variant="contained" color="tertiary">
      Reset
      </Button>
      </ButtonGroup>
      </div>
    );
  }
}
