import React, { useState } from "react";

const ProjectTitle = props => {
  const [title, setTitle] = useState(props.title);
  const [showModal, toggleModal] = useState(false);

  return (
    <header className="ProjectTitle">
      {!showModal && (
        <>
          <h2
            className="ProjectTitle__text"
            style={{
              display: "flex",
              alignItem: "center",
              paddingBlock: "10px",
            }}
          >
            {title}
            <button
              className="ProjectTitle__button--edit"
              onClick={() => toggleModal(!showModal)}
            >
              <span role="img" aria-label={`Projekt umbenennen'`}>
                🖋️
              </span>
            </button>
          </h2>
        </>
      )}

      {showModal && (
        <form
          onSubmit={e => {
            e.preventDefault();
            props.updateProjectTitle(title);
            toggleModal(false);
          }}
          style={{
            display: "flex",
            alignItem: "center",
            paddingBlock: "10px",
          }}
        >
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <button className="ProjectTitle__button--edit" type="submit">
            <span role="img" aria-label={`Projekt umbenennen'`}>
              ✔️
            </span>
          </button>
        </form>
      )}
    </header>
  );
};

export default ProjectTitle;
