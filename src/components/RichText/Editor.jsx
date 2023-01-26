import hljs from "highlight.js";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "highlight.js/styles/atom-one-dark.css";
import ReactQuill from "react-quill";

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust", "java", "c", "c++"],
});

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: [
    [{ header: [3, 4, 5, false] }],
    ["bold", "italic", "underline", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image", "video"],
    ["clean"],
    ["code-block"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
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
  "video",
  "code-block",
];

const Editor = ({ content, setContent }) => {
  return (
    <ReactQuill
      className='w-full'
      theme='snow'
      value={content}
      onChange={setContent}
      modules={modules}
      formats={formats}
    />
  );
};

export default Editor;
