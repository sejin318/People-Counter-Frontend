import React from 'react';
import WindowSize, { useWindowSize } from "@reach/window-size";

export default class Image extends React.Component {

  render() {
    const { location, img } = this.props;
    return (
      <WindowSize>
      {
        function(size){
          console.log(size, size.width*0.5, size.height*0.5);
          return (
            <div>
              <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
              <img width={size.width*0.6} height={size.height*0.4} src={`data:image/jpeg;base64,${img}`} />
            </div>
          );
        }
      }
      </WindowSize>
    )
  }
}
