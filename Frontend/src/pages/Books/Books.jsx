import React from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import Rating2 from "react-rating";
import { Link } from "react-router-dom";
import empty from "../../assets/empty.png";
import full from "../../assets/full-star.png";
import "./Books.css";

export default function Books() {
  return (
    <div>
      <div className="container pt-5 pb-5">
        <div className="row">
          <h4 className="text">#Feathers Books</h4>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-6">
            <figure class="snip1418">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdVVX7wQNYzk06uL-gJKmALyTxoJqnUKlBZg&usqp=CAU"
                alt="sample85"
              />
              <div class="add-to-cart">
                <i class="ion-android-add"></i>
                <span>Add to Cart</span>
              </div>
              <figcaption>
                <div className="d-flex justify-content-between">
                  <h3>Pudol Doux</h3>
                  <span className="cursour">
                    <BsArrowDownCircle />
                  </span>
                </div>
                <p>
                  All this modern technology just makes people try to do
                  everything at once.
                </p>
                <div class="price">
                  <s>$24.00</s>$19.00
                </div>
                <div className="rating">
                  <Rating2
                    readonly={true}
                    initialRating={2}
                    // fractions={10}
                    emptySymbol={
                      <img src={empty} width={10} height={10} alt="" />
                    }
                    fullSymbol={
                      <img src={full} width={10} height={10} alt="" />
                    }
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <Link to={`/readmore/${1}`} className="blog-btn">
                    Read More
                  </Link>
                  <Link to="/note" className="blog-btn">
                    Note
                  </Link>
                  {/* <button className="blog-btn">Note</button> */}
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="col-md-4 col-sm-6">
            <figure class="snip1418 hover">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUmfki_7bowVDP_ShqfOLuX685N2peQH-0gw&usqp=CAU"
                alt="sample96"
              />
              <div class="add-to-cart">
                {" "}
                <i class="ion-android-add"></i>
                <span>Add to Cart</span>
              </div>
              <figcaption>
                <div className="d-flex justify-content-between">
                  <h3>Kurie Secco</h3>
                  <span className="cursour">
                    <BsArrowDownCircle />
                  </span>
                </div>
                <p>
                  If you do the job badly enough, sometimes you don't get asked
                  to do it again.{" "}
                </p>
                <div class="price">
                  <s>$24.00</s>$19.00
                </div>
                <div className="rating">
                  <Rating2
                    readonly={true}
                    initialRating={3}
                    // fractions={10}
                    emptySymbol={
                      <img src={empty} width={10} height={10} alt="" />
                    }
                    fullSymbol={
                      <img src={full} width={10} height={10} alt="" />
                    }
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button className="blog-btn">Read More</button>
                  <button className="blog-btn">Note</button>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="col-md-4 col-sm-6">
            <figure class="snip1418">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpYmW_bFlypEDe8Q8OJLF5IaRR45fXKZDEwg&usqp=CAU"
                alt="sample92"
              />
              <div class="add-to-cart">
                {" "}
                <i class="ion-android-add"></i>
                <span>Add to Cart</span>
              </div>
              <figcaption>
                <div className="d-flex justify-content-between">
                  <h3>Zosaisan Invec</h3>
                  <span className="cursour">
                    <BsArrowDownCircle />
                  </span>
                </div>
                <p>
                  If your knees aren't green by the end of the day, you ought to
                  seriously re-examine your life.
                </p>
                <div class="price">
                  <s>$24.00</s>$19.00
                </div>
                <div className="rating">
                  <Rating2
                    readonly={true}
                    initialRating={4}
                    // fractions={10}
                    emptySymbol={
                      <img src={empty} width={10} height={10} alt="" />
                    }
                    fullSymbol={
                      <img src={full} width={10} height={10} alt="" />
                    }
                  />
                </div>
                <div className="d-flex justify-content-between">
                  <button className="blog-btn">Read More</button>
                  <button className="blog-btn">Note</button>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
