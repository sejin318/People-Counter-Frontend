import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Image from '../components/Image';

const mapStateToProps = (state, ownProps) => ({
  img: state.Graph.img[ownProps.location],
});


export default connect(mapStateToProps)(Image);
