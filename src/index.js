import React from "react";
import ReactDOM from "react-dom";
import Flexbox from "flexbox-react";
import { MTLModel } from "react-3d-viewer";

import "./index.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      imgs: [
        "1ZoneDataCenterCRAC_wApproachTemp",
        "1ZoneDataCenterCRAC_wPumpedDXCoolingCoil",
        "1ZoneEvapCooler",
        "1ZoneUncontrolled",
        "1ZoneUncontrolled3SurfaceZone"
      ],
      viewerImg: "1ZoneDataCenterCRAC_wApproachTemp"
    };
  }
  setViewerImg(title) {
    this.setState({ viewerImg: title });
  }
  handleChange = event => {
    this.setState({ searchValue: event.target.value });
  };
  renderThumb(img, idx) {
    return (
      <li className="thumb-nail">
        <img
          key={idx}
          title={img}
          alt={img}
          src={require(`./assets/${img}/idf.png`)}
          onClick={() => this.setViewerImg(img)}
        />
        <p className="thumb-text">{img}</p>
      </li>
    );
  }
  render() {
    const thumbs = this.state.imgs.map((img, idx) => {
      return contains(img, this.state.searchValue)
        ? this.renderThumb(img, idx)
        : "";
    });
    return (
      <Flexbox flexDirection="row" minWidth="99vw">
        <IDFPicker
          searchValue={this.state.searchValue}
          thumbs={thumbs}
          handleChange={this.handleChange}
        />
        <IDFViewer img={this.state.viewerImg} />
      </Flexbox>
    );
  }
}

function contains(str, substr) {
  return !substr || str.toLowerCase().includes(substr.toLowerCase());
}

function IDFPicker({ searchValue, handleChange, thumbs }) {
  return (
    <div id="picker">
      <h2>IDF Picker</h2>
      <input type="text" value={searchValue} onChange={handleChange} />
      <div id="pickerScrollbox">
        <ul>{thumbs}</ul>
      </div>
    </div>
  );
}

function IDFViewer({ img }) {
  return (
    <Flexbox flexDirection="column" minHeight="97vh">
      <IDFImage img={img} />
      <IDFData img={img} />
    </Flexbox>
  );
}
function IDFImage({ img }) {
  return (
    <div>
      <h2>{img} model</h2>
      <MTLModel
        key={img}
        src={require(`./assets/${img}/idf.obj`)}
        mtl={require(`./assets/${img}/idf.mtl`)}
        width={600}
        height={400}
        rotation={{ x: -45, y: 0, z: 0 }}
        position={{ x: 0, y: 0, z: 0 }}
      />
    </div>
  );
}

function IDFData({ img }) {
  return (
    <div>
      <h2>{img} IDF data</h2>
      <p>Lorem ipsem...</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
