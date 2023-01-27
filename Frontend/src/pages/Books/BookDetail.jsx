import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function BookDetail() {

    const [book, setBook] = useState({})
    const { id, bookid } = useParams();

    useEffect(() => {
        axios
          .get("/api/books")
          .then((res) => {
            console.log(res.data);
            const filterItems = res.data?.find(book=> book._id ===  bookid)
            console.log(filterItems);
            setBook(filterItems);
          })
          .catch((err) => {
            console.log(err.message);
          });
      }, []);
    


      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?.user?._id;

    console.log("user id:",id, userId,"-localStr");
    console.log("bookid: ", bookid)
    


  return (
    <div>
      <div className="container">
        <h4>BookDetail</h4>
        <div className="row">
          <div className="col-md-5">
            <div className="card">
                <div className="card-title">
                    {book?.name}
                </div>
                <p>{book?.description}</p>
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
