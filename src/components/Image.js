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
      const update = () => { updateCanvas(this.props.which_region); }
      update = update.bind(this);
      update();
    }
  }



  render() {
    const { location, img, buttons, canvas, regions, openDrawing, lines, lock, dispatch, bbox, anchorEl, which_region, data_count } = this.props;
    var define_start = false;
    var button;
    if(lock){
      button = (
        <Button onClick={(e) => {resetCanvas(); dispatch(unlock());}} variant="contained" color="tertiary">
        Define Region
        </Button>
      );
    } else {
      button = (
        <Button onClick={() => {finishDrawing(); }} variant="contained" color="tertiary">
        End Region
        </Button>
      )
    }
    return (
      <div style={{position:"relative"}}>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <div>
          <MouseOverPopover anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>
        </div>
        <canvas onClick={(e) => customDrawing(e, canvas, openDrawing, lines, lock)} width="1024" height="768" ref="canvas" className="canvas" />
        <img ref="image" src={require('./south gate img downsampled.jpg')} className="hidden" />
        <ButtonGroup
          orientation="vertical"
          color="primary"
          aria-label="vertical contained primary button group"
          variant="contained"
          style={{position:"absolute", bottom:0}}
        >
          {buttons.map((data) => (
            <Button onClick={() => updateCanvas(data)} variant="contained" color="tertiary">
            {data}
            </Button>
          ))}
          {button}
          <Button onClick={() => resetCanvas()} variant="contained" color="tertiary">
          Reset
          </Button>
        </ButtonGroup>
      </div>
    );
  }
}
