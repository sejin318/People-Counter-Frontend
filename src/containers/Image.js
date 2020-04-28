import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Image from '../components/Image';
import * as actions from '../actions/Image';

const mapStateToProps = (state, ownProps) => ({
  img: state.Graph.img[ownProps.location],
  buttons: state.commons.buttons[ownProps.location],
  canvas: state.canvas.canvas,
  regions: state.commons.regions[ownProps.location],
  openDrawing: state.Image.openDrawing,
  lines: state.Image.lines,
  lock: state.Image.lock,
  bbox: state.Graph.bbox[ownProps.location][state.Graph.bbox[ownProps.location].length-1]
});

export default connect(mapStateToProps)(Image);
