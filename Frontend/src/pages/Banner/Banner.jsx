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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL3EsJZt6F_O75W3TWkdC9lzR-8SyjhRLyhQ&usqp=CAU"
              alt="First slide"
            />

            <Carousel.Caption>
              <h3 className="display-5 mt-5 fw-bold text-white">
                Nothing is pleasanter than exploring a library.
              </h3>
              {/* <h3 className="textDe">CHOICE</h3> */}
              {/* <a href="#tours-section" className="btn btn-light px-4 py-2">Book Now</a> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-100">
            <div className="overlay"></div>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUAlIo3jpvpNSK372Zu3hhgh1wK_6OrxeImA&usqp=CAU"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className="display-5 mt-5 fw-bold text-white">
                Libraries raised me.
              </h3>
              {/* <h3 className="textDe">HAPPY</h3> */}
              {/* <a href="#tours-section" className="btn btn-light px-4 py-2">Book Now</a> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className="h-100">
            <div className="overlay"></div>
            <img
              className="d-block w-100"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVEdJyg_okh9YrONV7Gdqf9C0i9cr8S05XjsyvzOUa4KJgSaUPOxZV1C7vxRRaz0bbp88&usqp=CAU"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3 className="display-5 mt-5 fw-bold text-white">
                If your library is not “unsafe,” it probably isn’t doing its
                job.
              </h3>
              {/* <h3 className="textDe">PRODUCTS</h3> */}
              {/* <a href="#tours-section" className="btn btn-light px-4 py-2">Book Now</a> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </section>
    </div>
  );
}
