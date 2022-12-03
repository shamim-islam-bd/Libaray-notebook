import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { BsArrowDownCircle } from "react-icons/bs";
import Rating2 from "react-rating";
import { Link } from "react-router-dom";
import empty from "../../assets/empty.png";
import full from "../../assets/full-star.png";

export default function SingleBook() {
  const { id } = useParams();
  console.log(id);

  const [book, setBook] = useState([]);

  useEffect(() => {
    axios
      .get("/api/books")
      .then((res) => {
        res.data?.map((book) => (book?._id === id ? setBook(book) : null));
        // console.log(res.data);
        // setBooks(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  console.log(book);

  return (
    <div>
      <div className="row mt-4">
        <div className="col-md-7 col-sm-6">
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
                <h3>{book.name}</h3>
                <span className="cursour">
                  <BsArrowDownCircle />
                </span>
              </div>
              <p>{book.description}</p>
              <div class="price">${book.price}</div>
              <div className="rating">
                <Rating2
                  readonly={true}
                  initialRating={book.rating}
                  // fractions={10}
                  emptySymbol={
                    <img src={empty} width={10} height={10} alt="" />
                  }
                  fullSymbol={<img src={full} width={10} height={10} alt="" />}
                />
              </div>
              <div className="d-flex justify-content-between">
                {/* <Link to={`/readmore/${book?._id}`} className="blog-btn">
                  Read More
                </Link> */}
              </div>
            </figcaption>
          </figure>
        </div>
        <div className="col-md-5">
          <h4>Note Book</h4>
        </div>
      </div>
    </div>
  );
}
