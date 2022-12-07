import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { BsArrowDownCircle } from "react-icons/bs";
import Rating2 from "react-rating";
import { Link, useParams } from "react-router-dom";
import empty from "../../assets/empty.png";
import full from "../../assets/full-star.png";
import "./Books.css";

export default function Books() {
  const { id: documentId } = useParams();
  console.log(documentId);

  const alert = useAlert();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios
      .get("/api/books")
      .then((res) => {
        // console.log(res.data);
        setBooks(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // geting user id from localstorage bcz this user only edit his documents others can't access his documents.
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id;
  console.log(userId);

  return (
    <div>
      <div className="container pt-5 pb-5">
        <h4 className="text">#Feathers Books</h4>

        <div className="row">
          {books.length > 0
            ? books?.map((book) => (
                <div className="col-md-4 col-sm-6">
                  {/* {console.log(book)} */}
                  <figure class="snip1418">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdVVX7wQNYzk06uL-gJKmALyTxoJqnUKlBZg&usqp=CAU"
                      alt="sample85"
                    />

                    <figcaption>
                      <div className="d-flex justify-content-between">
                        <h3>{book?.name}</h3>
                        <span className="cursour">
                          <BsArrowDownCircle />
                        </span>
                      </div>
                      <p>
                        {book?.description?.length > 60
                          ? book?.description?.slice(0, 60) + "..."
                          : book?.description}
                      </p>
                      <div class="price">${book?.price}</div>

                      {/* rating start */}
                      <div className="rating">
                        <Rating2
                          readonly={true}
                          initialRating={book?.rating}
                          // fractions={10}
                          emptySymbol={
                            <img src={empty} width={10} height={10} alt="" />
                          }
                          fullSymbol={
                            <img src={full} width={10} height={10} alt="" />
                          }
                        />
                      </div>
                      {/* rating end */}

                      <div className="d-flex justify-content-between">
                        <Link to={`/documents/${userId}`} className="blog-btn">
                          Read More
                        </Link>
                      </div>
                    </figcaption>
                  </figure>
                </div>
              ))
            : " "}
        </div>
      </div>
    </div>
  );
}
