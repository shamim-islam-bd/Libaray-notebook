import axios from "axios";
import React from "react";
import { useAlert } from "react-alert";
import { useForm } from "react-hook-form";

export default function AddBook() {
  //react hook form
  const { register, handleSubmit, errors } = useForm();
  const alert = useAlert();

  const onSubmit = async (data) => {
    const bookData = {
        name : data?.name,
        author: data?.author,
        imageLink: data?.imageLink,
        description: data?.description,
        category: data?.category,
        price: data?.price
      }
      console.log(bookData);

      await axios
        .post("/api/books/addBook", bookData)
        .then((res) => {
          console.log(res.data);
          alert.success("Book Added Successfully");
        })
        .catch((err) => {
          console.log(err.message);
          alert.error(err.message);
        });

  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Add Book</h1>
            <form onSubmit={handleSubmit(onSubmit)}>

              <div className="form-group my-2">
                {/* <label htmlFor="bookName">Book Name</label> */}
                <input
                  type="name"
                  className="form-control"
                  {...register("name", {
                    required: "Book name is required",
                  })}
                  placeholder="Book name"
                />
                {errors?.name && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="form-group my-2">
                {/* <label htmlFor="author">Author Name</label> */}
                <input
                  type="author"
                  className="form-control"
                  {...register("author", {
                    required: "Book author is required",
                  })}
                  placeholder="Author Name"
                />
                {errors?.author && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="form-group my-2">
                {/* <label htmlFor="imageLink">Book Image Link</label> */}
                <input
                  type="imageLink"
                  className="form-control"
                  {...register("imageLink", {
                    required: "Book image is required",
                  })}
                  placeholder="Book Image Link"
                />
                {errors?.imageLink && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="form-group my-2">
                {/* <label htmlFor="description">Description</label> */}
                <textarea
                  className="form-control"
                  {...register("description", {
                    required: "Book description is required",
                  })}
                  placeholder="Description"
                />
                {errors?.description && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="form-group my-2">
                {/* <label htmlFor="category">Category</label> */}
                <input
                  type="category"
                  className="form-control"
                  {...register("category", {
                    required: "Book category is required",
                  })}
                  placeholder="Category"
                />
                {errors?.category && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="form-group my-2">
                {/* <label htmlFor="price">Price</label> */}
                <input
                  type="price"
                  className="form-control"
                  {...register("price", {
                    required: "Book price is required",
                  })}
                  placeholder="Price"
                />
                {errors?.price && (
                  <span className="text-danger">This field is required</span>
                )}
              </div>

              <div className="form-group mb-5">
                <button type="submit" className="btn btn-primary" >
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
