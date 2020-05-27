import React, { useState } from "react";

const SymbolForm = ({ symbol, submitLabel, submitHandler }) => {
  const state = {
    title: symbol.title,
    type: symbol.type
  }

  const [title, setTitle] = useState(state.title);
  const [type, setType] = useState(state.type);

  return (
    <form onReset={(e) => {
      e.preventDefault();
      setTitle(state.title);
      setType(state.type);
    }} onSubmit={(e) => {
      e.preventDefault();
      submitHandler({title: title, type: type});
    }}>
      <label htmlFor="title">Titel</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="type">Typ</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="Process">Prozess</option>
        <option value="TestFirstLoop">Kopfgesteuerte Schleife</option>
        <option value="TestLastLoop">Fußgesteuerte Schleife</option>
      </select>
      <button type="submit">{submitLabel}</button>
      <button type="reset">Reset</button>
    </form>
  );
};

export default SymbolForm;
