import React from "react";
import { connect } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Editor = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      [{ color: [] }, { background: [] }],
      ["code", "bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      // ["formula"],
    ],
  };

  const formats = [
    "header",
    "color",
    "background",
    "code",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <ReactQuill theme="snow" modules={modules} formats={formats} {...props} />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
