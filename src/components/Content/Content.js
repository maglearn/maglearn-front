import React from "react";

function Content({header, children}) {
  return (
    <>
      <h2>{header}</h2>
      <hr/>
      {children}
    </>
  );
}

export default Content;