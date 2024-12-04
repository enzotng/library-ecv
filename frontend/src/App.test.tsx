import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

test("renders without crashing", () => {
    render(
        <MemoryRouter>
            <div>Hello World</div>
        </MemoryRouter>
    );
    expect(screen.getByText("Hello World")).toBeInTheDocument();
});
