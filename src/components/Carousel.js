import React, { Component } from 'react';
import './Carousel.css';
import apple1 from './img/apple1.jpg';
import apple2 from './img/apple2.jpg';
import apple3 from './img/apple3.jpg';
import apple4 from './img/apple4.jpg';
import apple5 from './img/apple5.jpg';

class Carousel extends Component {
  state = {
    images: [
      { src: apple1, alt: 'Image 1' },
      { src: apple2, alt: 'Image 2' },
      { src: apple3, alt: 'Image 3' },
      { src: apple4, alt: 'Image 4' },
      { src: apple5, alt: 'Image 5' }
    ],
    activeIndex: 0
  };

  handleNext = () => {
    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex === prevState.images.length - 1 ? 0 : prevState.activeIndex + 1
    }));
  };

  handlePrev = () => {
    this.setState((prevState) => ({
      activeIndex: prevState.activeIndex === 0 ? prevState.images.length - 1 : prevState.activeIndex - 1
    }));
  };

  render() {
    const { images, activeIndex } = this.state;

    return (
      <div className="carousel">
        <div className="carousel-inner">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={index === activeIndex ? 'active' : 'hidden'}
            />
          ))}
        </div>
        <button className="carousel-prev" onClick={this.handlePrev}>
          Prev
        </button>
        <button className="carousel-next" onClick={this.handleNext}>
          Next
        </button>
      </div>
    );
  }
}

export default Carousel;
