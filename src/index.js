import React, { useState } from "react";
import ReactDOM from "react-dom";
import Flexbox from "flexbox-react";
import { MTLModel } from "react-3d-viewer";
import { imgs } from "./imgs";
import "./index.css";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [viewerImg, setViewerImg] = useState(imgs[0]);
  const thumbs = imgs.map((img, idx) => {
    return contains(img, searchValue) ? Thumb({ img, idx, setViewerImg }) : "";
  });
  return (
    <Flexbox flexDirection="row" minWidth="99vw">
      <IDFPicker
        searchValue={searchValue}
        thumbs={thumbs}
        setSearchValue={setSearchValue}
      />
      <IDFViewer img={viewerImg} />
    </Flexbox>
  );
}

function Thumb(props) {
  return (
    <li key={props.idx} className="thumb-nail">
      <img
        title={props.img}
        alt={props.img}
        src={require(`./assets/${props.img}/idf.png`)}
        onClick={() => props.setViewerImg(props.img)}
      />
      <p className="thumb-text">{props.img}</p>
    </li>
  );
}

function contains(str, substr) {
  // case-insensitive test of whether str contains substr
  return !substr || str.toLowerCase().includes(substr.toLowerCase());
}

function IDFPicker(props) {
  return (
    <div id="picker">
      <h2>IDF Picker</h2>
      <input
        type="text"
        value={props.searchValue}
        onChange={e => props.setSearchValue(e.target.value)}
      />
      <div id="pickerScrollbox">
        <ul>{props.thumbs}</ul>
      </div>
    </div>
  );
}

function IDFViewer(props) {
  return (
    <Flexbox flexDirection="column" minHeight="97vh">
      <IDFImage img={props.img} />
      <IDFData img={props.img} />
    </Flexbox>
  );
}
function IDFImage(props) {
  return (
    <div>
      <h2>{props.img} model</h2>
      <MTLModel
        key={props.img}
        src={require(`./assets/${props.img}/idf.obj`)}
        mtl={require(`./assets/${props.img}/idf.mtl`)}
        width={600}
        height={400}
        rotation={{ x: -45, y: 0, z: 0 }}
        position={{ x: 0, y: 0, z: 0 }}
      />
    </div>
  );
}

function IDFData(props) {
  return (
    <div>
      <h2>{props.img} IDF data</h2>
      <p>Lorem ipsem...</p>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
