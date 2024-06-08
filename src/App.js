import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

/* 就是你要弄两个input field，一个是name，一个是number，然后输入之后要在那个两个书框上面形成一个布局，然后把那个显示出来。 */

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [idInEdit, setIdInEdit] = useState('');

  const addItem = (name) => {
    const currItem = { name: name, id: Date.now() };
    setItems([...items, currItem]);
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // browser default
    // if(isEdit)
    addItem(input);
    setInput('');
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id != id));
  };

  const handleSave = () => {
    console.log(input, 'input:');
    let new_items = items.map((item) => {
      if (item.id == idInEdit) return { name: input, id: idInEdit };
      return item;
    });

    setInput('');
    setIdInEdit(null);
    setIsEdit(false);

    setItems(new_items);
  };

  return (
    <div className="App">
      <header>Todo</header>
      <main>
        {!isEdit ? (
          <div>
            Input
            <input onChange={handleInput} type="text" value={input} />
            <button onClick={handleSubmit}>Add</button>
          </div>
        ) : (
          <div>
            <input
              type="text"
              value={input}
              onChange={handleInput}
            />
            <button onClick={handleSave}>save</button>
          </div>
        )}
        <div>
          <div>List</div>
          <ul>
            {items.map((item) => {
              return (
                <li key={item.name + item.id}>
                  <span>{item.name}</span>
                  <button
                    onClick={() => {
                      setIsEdit(true);
                      setIdInEdit(item.id);
                    }}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </li>
              );
            })}
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;
