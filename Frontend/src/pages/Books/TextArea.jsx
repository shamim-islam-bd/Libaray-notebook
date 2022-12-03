import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./BookNote.scss";

const BookNote = () => {
  // { description, setDescription, saveProduct }
  const [description, setDescription] = useState("");

  const saveNote = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("description", description);

    // await dispatch(createProduct(formData));
    // navigate("/dashboard");
  };

  return (
    <div className="add-product">
      <h4>Note Book</h4>
      <div className="">
        <form onSubmit={saveNote}>
          <ReactQuill
            theme="snow"
            value={description}
            onChange={setDescription}
            modules={BookNote.modules}
            formats={BookNote.formats}
          />

          <div className="--my">
            <button type="submit" className="mt-3 btn btn-primary">
              Save Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

BookNote.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
BookNote.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default BookNote;
