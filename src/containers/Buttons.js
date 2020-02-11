import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Buttons from '../components/Buttons';

const mapStateToProps = state => ({
  categories: state.commons.categories
});


export default connect(mapStateToProps)(Buttons);
