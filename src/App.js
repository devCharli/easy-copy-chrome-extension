import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt, FaSave, FaRegCopy } from "react-icons/fa";
import "./index.css";

function App() {
  const [list, setList] = useState(() => {
    const savedList = localStorage.getItem("list");
    if (savedList) {
      return JSON.parse(savedList);
    } else {
      return [];
    }
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input) {
      return;
    } else {
      const newItem = {
        id: uuidv4(),
        text: input,
      };
      setList([...list, newItem]);
      setInput("");
    }
  };

  const handleDelete = (id) => {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
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
      <section>
        <h1>
          copy <FaRegCopy />
        </h1>
        {/* add form */}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Keywords..."
            onChange={(e) => {
              setInput(e.target.value.trim());
            }}
            value={input}
          />
          <button className="save-button">
            <FaSave className="save-btn" />
          </button>
        </form>
        {/* list */}
        <ul>
          {list.map((item) => (
            <li className="list" key={item.id}>
              <span
                className="text"
                onClick={(e) => {
                  handleCopy(item.text, e);
                }}
              >
                {" "}
                {item.text}
              </span>
              <FaTrashAlt
                className="trash"
                onClick={() => handleDelete(item.id)}
              ></FaTrashAlt>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
