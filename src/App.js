import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt, FaSave, FaRegCopy } from "react-icons/fa";
import "./index.css";

const getData = () => {
  const savedList = localStorage.getItem("list");
  if (savedList) {
    return JSON.parse(savedList);
  } else {
    return [];
  }
};

function App() {
  const [list, setList] = useState(getData);
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      return;
    } else {
      const newItem = {
        id: uuidv4(),
        text: text,
      };
      setList((prevList) => [...prevList, newItem]);
      setText("");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to delete?")) {
      setList((prevList) => prevList.filter((item) => item.id !== id));

      // setList((prevList) => {
      //   return prevList.filter((item) => {
      //     return item.id !== id;
      //   });
      // });
    }
  };

  const handleCopy = (text, e) => {
    navigator.clipboard.writeText(text);
    e.target.className = "text clicked";
    setTimeout(() => {
      e.target.className = "text";
    }, 500);
  };

  return (
    <div className="App">
      <h1>
        copy <FaRegCopy />
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Text..."
          onChange={(e) => {
            setText(e.target.value.trim());
          }}
          value={text}
        />
        <button className="button">
          <FaSave className="button-icon" />
        </button>
      </form>
      <ul>
        {list.map((item) => (
          <li className="list" key={item.id}>
            <span
              className="text"
              onClick={(e) => {
                handleCopy(item.text, e);
              }}
            >
              {item.text}
            </span>
            <button className="button">
              <FaTrashAlt
                className="button-icon"
                onClick={() => handleDelete(item.id)}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
