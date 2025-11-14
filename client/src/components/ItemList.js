import React, { useState, useEffect } from 'react';

function ItemList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/items`)
      .then(res => res.json())
      .then(data => setItems(data.items))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then(res => res.json())
      .then(item => setItems([...items, item]))
      .catch(err => console.error(err));
    setNewItem({ name: '', description: '' });
  };

  return (
    <div>
      <h2>Items</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>{item.name}: {item.description}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default ItemList;