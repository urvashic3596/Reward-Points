import React from "react";
import { render } from "@testing-library/react";
import App from "../app";

jest.mock("../screens/Driver", () => () => <div>Mocked Driver Component</div>);

describe("App Component", () => {
  it("should render the Driver component", () => {
    const { getByText } = render(<App />);
    expect(getByText("Mocked Driver Component")).toBeInTheDocument();
  });
});
