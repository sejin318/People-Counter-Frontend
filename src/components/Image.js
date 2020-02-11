import React from 'react';
import PropTypes from 'prop-types';

export default class Image extends React.Component {

  render() {
    const { location, img } = this.props;
    return (
      <div>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <img src={`data:image/jpeg;base64,${img}`} />
      </div>
    )
  }
}
