import React from 'react';
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, drawRegion, start_drawing, add_line, reset_line, unlock, change_region } from '../actions/Image';
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
  }

  componentDidMount() {
    const { dispatch,  } = this.props;
    const canvas = this.refs.canvas;
    const img = this.refs.image
    dispatch(setCanvas(canvas));
    const ctx = canvas.getContext("2d");
    img.onload = () => {
      ctx.drawImage(img, 0, 0);
    }
  }

  componentWillUpdate(nextProps) {
    if(this.props.data_count != nextProps.data_count){
      const update = () => { this.updateCanvas(this.props.which_region); }
      update();
    }
  }

  updateCanvas(index_name){
    this.props.dispatch(change_region(index_name));
    const img = this.refs.image
    drawRegion(this.props, index_name, img);
  }

  resetCanvas(){
    this.props.dispatch({
      type: 'RESET'
    });
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
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
    ctx.lineWidth = 5;
    if(!openDrawing){
      dispatch(start_drawing());
      dispatch(add_line(x, y));
    } else {
      dispatch(add_line(x, y));
      ctx.beginPath();
      ctx.moveTo(lines[lines.length-2], lines[lines.length-1]);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  finishDrawing(){
    this.props.dispatch(change_region('define'));
    this.props.dispatch({
      type: 'FINISH_DRAWING'
    });
    drawRegion(this.props, 'define', this.refs.image);
    // this.props.dispatch(reset_line());
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
