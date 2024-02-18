import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import "./image-slider.css";

export default function ImageSlider({ url, limit }) {
  const [images, setImages] = useState([]);
  const [currSlide, setCurrSlide] = useState(0);
  const [errMsg, setErrMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (url !== "") {
      fetchImages(url);
    }
  }, [url]);

  async function fetchImages(url) {
    try {
      setLoading(true);
      const response = await fetch(`${url}?page=1&limit=${limit}`);
      const data = await response.json();

      if (data) {
        console.log(data);
        setImages(data);
        setLoading(false);
      }
    } catch (error) {
      setErrMsg(error.message);
      setLoading(false);
    }
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }
  if (errMsg !== null) {
    return <h3>Error Occured! {errMsg}</h3>;
  }

  function handlePrevious() {
    setCurrSlide(currSlide === 0 ? images.length - 1 : currSlide - 1);
  }
  function handleNext() {
    setCurrSlide(currSlide === images.length - 1 ? 0 : currSlide + 1);
  }

  return (
    <div className="container">
      <BsArrowLeftCircleFill
        className="arrow arrow-left"
        onClick={handlePrevious}
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.download_url}
              src={imageItem.download_url}
              className={
                currSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
      <BsArrowRightCircleFill
        className="arrow arrow-right"
        onClick={handleNext}
      />
      <span className="circle-indicators">
        {images && images.length
          ? images.map((_, index) => (
              <button
                key={index}
                className={
                  currSlide === index
                    ? "current-indicator"
                    : "current-indicator inactive-indicator"
                }
                onClick={() => setCurrSlide(index)}
              ></button>
            ))
          : null}
      </span>
    </div>
  );
}
