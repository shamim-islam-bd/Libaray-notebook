import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { BsArrowDownCircle } from "react-icons/bs";
import Rating2 from "react-rating";
import { Link } from "react-router-dom";
import empty from "../../assets/empty.png";
import full from "../../assets/full-star.png";
import "./Feathures.css";

// Feathures

export default function Feathures() {
  {
    /* collapseable comments function */
  }
  const [collapse, setCollapse] = useState(false);
  const toggle = () => setCollapse(!collapse);

  // const { id: documentId } = useParams();
  // console.log(documentId);

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

  // // geting user id from localstorage bcz this user only edit his documents others can't access his documents.
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id;
  // console.log("user Id:", userId);
  // console.log(user.user.photo);

  // show only 6 books
  const showBooks = books.slice(0, 6);

  return (
    <div>
      <div className="container pt-5 pb-5">
        <div className="row">
          <div className="d-flex justify-content-between">
            <h4 className="text"># Features Books</h4>
            <div className="frmGrp d-flex">
              <input
                type="text"
                className="form-control search"
                placeholder="Search book"
              />
              <div className="input-group-append">
                <button className="btn btn-outline-secondary" type="button">
                  Search
                </button>
              </div>
            </div>
          </div>
          {books.length > 0
            ? books?.map((book) => (
                <div className="col-md-4 col-sm-6">
                  {/* {console.log(book)} */}
                  <figure class="snip1418">
                    <div className="imgDiv">
                      <img
                        className="bookImg"
                        src={book?.imageLink}
                        alt="sample85"
                      />
                    </div>

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
                        <Link
                          to={`/documents/${userId}/${book._id}`}
                          className="blog-btn"
                        >
                          Read More
                        </Link>
                        {/* <Link
                          to={`/documents/${book._id}`}
                          className="blog-btn"
                        >
                          Read More
                        </Link> */}
                        <Link to="" onClick={toggle} className="">
                          Reviews
                        </Link>
                      </div>
                      {/* collapseable comments section */}
                      {collapse ? (
                        <div className="" id="collapseExample">
                          <div className="card card-body">
                            {book && book.reviews && book.reviews.length > 0
                              ? book?.reviews?.map((review) => (
                                  <div key={review._id} className=" mt-4">
                                    {/* {  console.log(review)} */}
                                    <div className="d-flex">
                                      <img
                                        src={user?.user?.photo}
                                        alt=""
                                        className="rounded-circle w-25"
                                      />
                                      <div>
                                        <div className="d-flex">
                                          <h6>{user?.user?.name}</h6>
                                          <div className="rating">
                                            <Rating2
                                              readonly={true}
                                              initialRating={book?.rating}
                                              // fractions={10}
                                              emptySymbol={
                                                <img
                                                  src={empty}
                                                  width={10}
                                                  height={10}
                                                  alt=""
                                                />
                                              }
                                              fullSymbol={
                                                <img
                                                  src={full}
                                                  width={10}
                                                  height={10}
                                                  alt=""
                                                />
                                              }
                                            />
                                          </div>
                                        </div>
                                        <p className="">{review.review}</p>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              : " No reviews yet "}
                          </div>
                        </div>
                      ) : null}
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
