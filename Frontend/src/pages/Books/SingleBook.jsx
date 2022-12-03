import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowDownCircle } from "react-icons/bs";
import Rating2 from "react-rating";
import { useParams } from "react-router-dom";
import empty from "../../assets/empty.png";
import full from "../../assets/full-star.png";

import BookNote from "./TextArea";

export default function SingleBook() {
  const { id } = useParams();

  const [book, setBook] = useState([]);
  const [description, setDescription] = useState("");

  const saveNote = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);

    // await dispatch(createProduct(formData));
    // navigate("/dashboard");
  };

  useEffect(() => {
    axios
      .get("/api/books")
      .then((res) => {
        res.data?.map((book) => (book?._id === id ? setBook(book) : null));
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // console.log(book);

  return (
    <div className="container">
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
          <BookNote />
        </div>
      </div>
    </div>
  );
}
