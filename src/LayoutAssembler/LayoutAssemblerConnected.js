import {connect} from 'react-redux';
import {LayoutAssembler as Layout} from './LayoutAssembler';

function mapStateToProps(state) {
  return state;
}


export default connect(mapStateToProps)(Layout);
