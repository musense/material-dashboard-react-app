import React from "react";

export default function BodyCell({ children, className = null }) {
    return <div className={className}>{children}</div>;
}
