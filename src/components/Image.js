import React from 'react';
import './Image.css';
import Button from '@material-ui/core/Button';
import { setCanvas, drawRegion, start_drawing, add_line, reset_line, unlock, change_region, customDrawing, setAnchorEl, updateCanvas, resetCanvas, finishDrawing } from '../actions/Image';
import { ButtonGroup } from '@material-ui/core';
import MouseOverPopover from './popover';

export default class Image extends React.Component {

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
      const update = updateCanvas.bind(this);
      // const update = (() => { updateCanvas(this.props.which_region); }).bind(this);
      update(this.props.which_region);
    }
  }

// arrow function forces "bind" to bind to where the function was declared!
// normal function "bind" to where it is called!

  render() {
    const { location, img, buttons, canvas, regions, openDrawing, lines, lock, dispatch, bbox, anchorEl, which_region, data_count } = this.props;
    var define_start = false;
    var button;
    if(lock){
      button = (
        <Button style={{borderRadius: 0}}  onClick={(e) => {resetCanvas.bind(this)(); dispatch(unlock());}} variant="contained" color="tertiary">
        Define Region
        </Button>
      );
    } else {
      button = (
        <Button style={{borderRadius: 0}}  onClick={() => {finishDrawing.bind(this)(); }} variant="contained" color="tertiary">
        End Region
        </Button>
      )
    }
    return (
      <div style={{position:"relative"}}>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <div>
          <MouseOverPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl.bind(this)}/>
        </div>
        <canvas onClick={(e) => customDrawing.bind(this)(e)} width="1024" height="768" ref="canvas" className="canvas" />
        <img ref="image" src={require('./south gate img downsampled.jpg')} className="hidden" />
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="contained"
          style={{position:"absolute", bottom:0}}
        >
          {buttons.map((data) => (
            <Button style={{borderRadius: 0}} onClick={() => updateCanvas.bind(this)(data)} variant="contained" color="tertiary">
            {data}
            </Button>
          ))}
          {button}
          <Button style={{borderRadius: 0}} onClick={() => resetCanvas.bind(this)()} variant="contained" color="tertiary">
          Reset
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
