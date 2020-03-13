import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Image from '../components/Image';
import * as actions from '../actions/Image';

const mapStateToProps = (state, ownProps) => ({
  img: state.Graph.img[ownProps.location],
  buttons: state.commons.buttons[ownProps.location],
  canvas: state.canvas.canvas
});


export default connect(mapStateToProps)(Image);
