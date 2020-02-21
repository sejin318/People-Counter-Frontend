import React from 'react';

export default class Image extends React.Component {

  render() {
    const { location, img } = this.props;
    return (
      <div>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <img width="1600" height="900" src={`data:image/jpeg;base64,${img}`} />
      </div>
    )
  }
}


<WindowSize>
{
  function(size){
    console.log(size, size.width*0.5, size.height*0.5);
    return (
      <div>
        <h1 className="mt-5">CAMERA VIEW AT {location.toUpperCase()}</h1>
        <img width={size.width*0.5} height={size.height*0.5} src={`data:image/jpeg;base64,${img}`} />
      </div>
    );
  }
}
</WindowSize>
