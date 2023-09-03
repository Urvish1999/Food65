import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function CarouselComponent() {
  const imageStyle = {
    width: '100%',
    maxHeight: '500px',
    objectFit: 'cover',
  };

  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block border border-dark w-100 h-25" src="https://source.unsplash.com/random/900x600/?pizza" alt="First slide" style={imageStyle} />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block border border-dark w-100 h-25" src="https://source.unsplash.com/random/900x600/?burger" alt="Second slide" style={imageStyle} />
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block border border-dark w-100 h-25" src="https://source.unsplash.com/random/900x600/?sandwich" alt="Third slide" style={imageStyle} />
      </Carousel.Item>
    </Carousel>
  );
}

