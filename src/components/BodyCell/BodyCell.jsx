import React from "react";

export default function BodyCell({ children, className = null }) {
    console.log("🚀 ~ file: BodyCell.jsx:4 ~ BodyCell ~ children:", children)
    return <div className={className}>{children}</div>;
}
