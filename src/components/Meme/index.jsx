import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { saveAs } from "file-saver";
import "./Meme.css"; // Import the CSS file where classes are defined

const Meme = ({ meme, setMeme }) => {
  const { id } = useParams();
  const [memeData, setMemeData] = useState({
    values: [],
  });
  const navigate = useNavigate();

  let url = `https://api.imgflip.com/caption_image?template_id=${id}&username=Yourusername_1&password=YourPass`;

  memeData.values.forEach((item, index) => {
    url += `&boxes[${index}][text]=${item.text}`;
  });

  const generateMeme = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(url, { method: "POST" });
      const json = await res.json();

      setMeme({ ...meme, url: json.data.url });
    } catch (e) {
      alert("Fill out the captions input");
    }
  };

  const inputs = [...Array(meme.box_count)].map((item, index) => {
    const handleChange = (e) => {
      let newValues = memeData.values;
      newValues[index] = { text: e.target.value };
      setMemeData((prevState) => ({
        ...prevState,
        values: newValues,
      }));
    };

    return (
      <input
        key={index}
        name={`input${index}`}
        placeholder={`Caption ${index + 1}`}
        onChange={handleChange}
        value={memeData.values.text}
      />
    );
  });

  const downloadImage = async (imageSrc) => {
    saveAs(imageSrc, meme.name);
  };

  const backToHome = () => {
    setMeme(null);
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <h4>{meme.name}</h4>
        <div className="MemeWrapper">
          <img src={meme.url} className="Meme-img" alt="Meme" />
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="Inputs">{inputs}</div>
          <div className="Inputs">
            <button type="button" className="Button" onClick={backToHome}>
              Get a new meme template
            </button>
            <button type="submit" className="Button" onClick={generateMeme}>
              Generate Meme
            </button>
            <button
              type="submit"
              className="Button"
              onClick={() => downloadImage(meme.url)}
            >
              Download Meme
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Meme;
