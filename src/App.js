import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

/* 就是你要弄两个input field，一个是name，一个是number，然后输入之后要在那个两个书框上面形成一个布局，然后把那个显示出来。 */

function App() {
  const [items, setItems] = useState(() => {
    return JSON.parse(localStorage.getItem('items')) || [];
  });
  const [input, setInput] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [idInEdit, setIdInEdit] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(false);

  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    let sortedItems = [...items].sort((a, b) => {
      if (sortOrder == 'asc') return a.name.localeCompare(b.name);
      else return b.name.localeCompare(a.name);
    });
    setItems(sortedItems);
  }, [sortOrder]);

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
    if (input == '') {
      setError(true);
      return;
    }
    addItem(input);
    setInput('');
    setError(false);

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

  const handleSort = (order) => {
    setSortOrder(order);
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
            <input type="text" value={input} onChange={handleInput} />
            <button onClick={handleSave}>save</button>
          </div>
        )}
        <div>
          {error && <div> wrong {error}</div>}
          <div>
            List
            <button onClick={() => handleSort('asc')}>asc</button>
            <button onClick={() => handleSort('desc')}>desc</button>
          </div>

          <ul>
            {items.map((item) => {
              return (
                <li key={item.name + item.id}>
                  <span
                    style={{
                      backgroundColor: idInEdit == item.id ? 'red' : 'white',
                    }}
                  >
                    {item.name}
                  </span>
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
