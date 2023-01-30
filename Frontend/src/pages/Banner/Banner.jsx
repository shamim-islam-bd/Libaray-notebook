import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Banner.css";

export default function Banner() {
  return (
    <div>
      <section id="cover">
        <Carousel fade indicators={false}>
          <Carousel.Item className="h-100">
            <div className="overlay"></div>
            <img
              className="d-block w-100"
              src="https://scranton.psu.edu/sites/scranton/files/leisure_reading_collection.jpg"
              alt="First slide"
            />

            <Carousel.Caption>
              <h3 className="display-5 mt-5 fw-bold text-white">
                Nothing is pleasanter than exploring a library.
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-100">
            <div className="overlay"></div>
            <img
              className="d-block w-100"
              src="https://www.bookspaceforschools.co.uk/wp-content/uploads/2021/08/bookspace-gallery-latest-work-aug19-bonnygate-primary-school-1-1.jpg"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className="display-5 mt-5 fw-bold text-white">
                Libraries raised me.
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-100">
            <div className="overlay"></div>
            <img
              className="d-block w-100"
             src="data:image/png;base64,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"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className="display-5 mt-5 fw-bold text-white">
                If your library is not “unsafe,” it probably isn’t doing its
                job.
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  );
}
