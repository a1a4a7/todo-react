v1 base
TODO

- CRUD

v2 Grid
display: grid;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(100px, 1fr);

    display: flex;
    flex-wrap: wrap;
    - flex: 0 0 33%;

v3 styling

inline highlight:
style =
{{ backgroundColor: idInEdit == item.id ? 'red' : 'white' }}



v4 localstorage

const [items, setItems] = useState(() => {
return JSON.parse(localStorage.getItem('items')) || [];
});

useEffect(()=> {localStorage.setItem('items', JSON.stringify(items))}, [items])

v5
filter asc desc

  useEffect(() => {
    let sortedItems = [...items].sort((a, b) => {
      if (sortOrder == 'asc') return a.name.localeCompare(b.name);
      else return b.name.localeCompare(a.name);
    });
    setItems(sortedItems);
  }, [items, sortOrder]);


v6
error handle

{error && <div> wrong {error}</div>}

  const handleSubmit = (e) => {
    if (input == '') {
      setError(true);
      return;
    }
