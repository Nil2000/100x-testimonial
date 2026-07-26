import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/cjs/styles/hljs";

export default function CodeBlock({
  codeString,
  language,
}: {
  codeString: string;
  language?: "html" | "javascript" | "typescript";
}) {
  return (
    <SyntaxHighlighter
      language={language || "html"}
      style={docco}
      customStyle={{
        fontFamily: "monospace",
        fontSize: "0.875rem",
        borderRadius: "8px",
      }}
    >
      {codeString}
    </SyntaxHighlighter>
  );
}
