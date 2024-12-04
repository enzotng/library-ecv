import React from "react";
import { render, screen } from "@testing-library/react";

test("renders a simple message", () => {
    render(<div>Hello World</div>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
});
