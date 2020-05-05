import React from 'react';
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, drawRegion, start_drawing, add_line, intersect, reset_line, unlock, change_region } from '../actions/Image';
import { ButtonGroup } from '@material-ui/core';
import MouseOverPopover from './popover';

export default class Image extends React.Component {

  setAnchorEl(target){
    this.props.dispatch({
      type: 'SET_ANCHOR',
      payload: target
    });
  }

  componentWillUnmount(){
    console.log('Image component will unmount');
  }

  componentDidMount() {
    console.log('Image component mounted');
    const { dispatch,  } = this.props;
    const canvas = this.refs.canvas;
    const img = this.refs.image
    dispatch(setCanvas(canvas));
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }
  }

  componentDidUpdate(nextProps) {
    //update if some prop has changed!
    if(this.props.data_count != nextProps.data_count){
      this.updateCanvas(this.props.which_region).bind(this);
    }
  }

  updateCanvas(index_name){
    this.props.dispatch(change_region(index_name));
    const img = this.refs.image
    drawRegion(this.props, index_name, img);
  }

  resetCanvas(){
    this.props.dispatch(change_region(''));
    const canvas = this.refs.canvas;
    const img = this.refs.image
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }

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
      // console.log("opendrawing false! ");
      dispatch(start_drawing());
      dispatch(add_line(x, y));
    } else {
      // console.log("opendrawing true!");
      dispatch(add_line(x, y));
      ctx.beginPath();
      ctx.moveTo(lines[lines.length-2], lines[lines.length-1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  finishDrawing(){
    this.props.dispatch(change_region('define'));
    drawRegion(this.props, 'define', this.refs.image);
    this.props.dispatch(reset_line());
  }

  render() {
    const { location, img, buttons, canvas, regions, openDrawing, lines, lock, dispatch, bbox, anchorEl, which_region, data_count } = this.props;
    var define_start = false;
    var button;
    if(lock){
      button = (
        <Button onClick={(e) => {this.resetCanvas(); dispatch(unlock());}} variant="contained" color="tertiary">
        Define Region
        </Button>
      );
    } else {
      button = (
        <Button onClick={() => {this.finishDrawing(); }} variant="contained" color="tertiary">
        End Region
        </Button>
      )
    }
    return (
      <div style={{position:"relative"}}>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <div>
          <MouseOverPopover anchorEl={anchorEl} setAnchorEl={this.setAnchorEl.bind(this)}/>
        </div>
        <canvas onClick={(e) => this.customDrawing(e, canvas, openDrawing, lines, lock)} width="1024" height="768" ref="canvas" className="canvas" />
        <img ref="image" src={require('./south gate img downsampled.jpg')} className="hidden" />
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="contained"
          style={{position:"absolute", bottom:0}}
        >
          {buttons.map((data) => (
            <Button onClick={() => this.updateCanvas(data)} variant="contained" color="tertiary">
            {data}
            </Button>
          ))}
          {button}
          <Button onClick={() => this.resetCanvas()} variant="contained" color="tertiary">
          Reset
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
