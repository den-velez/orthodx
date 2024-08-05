import React from "react";

export default function TextWithLineBreaksComponent({
  text,
}: {
  text: string;
}) {
  // Split the text by newline characters and map each part to a <span> with a <br />
  const lines = text.split("\n").map((line: string, index: number) => (
    <React.Fragment key={index}>
      {line}
      <br />
    </React.Fragment>
  ));

  return <p>{lines}</p>;
}
