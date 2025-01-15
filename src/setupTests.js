// src/setupTests.js

// Import necessary libraries for testing
import "@testing-library/jest-dom"; // Extends Jest with additional matchers for DOM nodes
import { TextEncoder, TextDecoder } from "util";
import "whatwg-fetch"; // Polyfills Fetch API, which includes ReadableStream

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = class {};

// Mock MatchMedia (useful for responsive testing or libraries relying on it)
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  };
