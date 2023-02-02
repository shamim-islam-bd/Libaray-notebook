import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import Rating2 from "react-rating";
import { useParams } from "react-router-dom";
import empty from "../../assets/empty.png";
import full from "../../assets/full-star.png";
import TextEditor from "./TextEditor";

export default function BookDetail() {
  const alert = useAlert();

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const CreateReview = (id) => {
    console.log(id);
    console.log(rating, review);
    const data = {
      rating,
      review,
    };

    axios
      .post(`/api/books/review/${id}`, data)
      .then((res) => {
        console.log(res.data);
        alert.success("Review added successfully");
      })
      .catch((err) => {
        console.log(err.message);
        alert.error(err.message);
      });
  };

  const [book, setBook] = useState({});
  const { id, bookid } = useParams();

  useEffect(() => {
    axios
      .get("/api/books")
      .then((res) => {
        console.log(res.data);
        const filterItems = res.data?.find((book) => book._id === bookid);
        console.log(filterItems);
        setBook(filterItems);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.user?._id;

  // console.log("user id:", id, userId, "-localStr");
  // console.log("bookid: ", bookid);

  return (
    <div>
      <div className="container mt-4">
        {/* <h4>BookDetail</h4> */}
        <div className="row">
          <div className="col-md-5">
            <h2 className="card-title mb-4">{book?.name}</h2>
            <p className="text-muted">Author : {book.author}</p>
            <div className="bookcard" sticky="top">
              <p className="des">{book?.description}</p>
            </div>
            <div className="mb-5" id="collapseExample">
              <div className="card card-body">
                <div className="d-flex justify-content-between">
                  <div className="">
                    {/* geting rating from user  */}
                    <Rating2
                      className="rating"
                      initialRating={rating}
                      fractions={10}
                      emptySymbol={
                        <img src={empty} width={4} height={4} alt="" />
                      }
                      fullSymbol={
                        <img src={full} width={4} height={4} alt="" />
                      }
                      onChange={(e) => setRating(e)}
                    />

                    <textarea
                      placeholder="Write a review"
                      //value={review}
                      onChange={(e) => setReview(e.target.value)}
                      className="form-control mb-2"
                      col="1"
                      rows="1"
                    ></textarea>
                    <button
                      onClick={() => CreateReview(book._id)}
                      className="btn btn-info"
                    >
                      Save
                    </button>
                  </div>
                </div>
                {book?.reviews?.map((review) => (
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
                                <img src={full} width={10} height={10} alt="" />
                              }
                            />
                          </div>
                        </div>
                        <p className="">{review.review}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <TextEditor />
          </div>
        </div>
      </div>
    </div>
  );
}
