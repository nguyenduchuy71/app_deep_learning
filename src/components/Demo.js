import React, { useState, useRef } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import "./main.css";
function Demo() {
  const intputRef = useRef(null);
  const [image, setImage] = useState(
    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
  );
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleUploadImage = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("file", intputRef.current.files[0]);
    let res = await axios.post("http://localhost:8000/upload", data);
    setImage("data:image/jpeg;base64," + res.data.data);
    setLoading(false);
  };
  const handleChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    setCheck(true);
  };

  return (
    <form onSubmit={handleUploadImage}>
      <div className="image">
        {loading ? (
          <ReactLoading color="#34abeb" type="balls" />
        ) : (
          <div className="container">
            <img src={image} alt="img" />
          </div>
        )}
      </div>
      <div className="input">
        <input ref={intputRef} onChange={handleChange} type="file" />
      </div>
      <div>{check && <button>Predict</button>}</div>
    </form>
  );
}

export default Demo;
