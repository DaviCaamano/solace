// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'whatwg-fetch';

//Mock Missing ClipboardEvent for JS-Dom
class ClipboardEventMock extends Event {
  clipboardData: {
    getData: jest.Mock<any, [string]>;
    setData: jest.Mock<any, [string, string]>;
  };

  constructor(type: string, eventInitDict?: EventInit) {
    super(type, eventInitDict);
    this.clipboardData = {
      getData: jest.fn(),
      setData: jest.fn(),
    };
  }
}
(globalThis as any).ClipboardEvent = ClipboardEventMock;

//Mock Missing DragEventMock for JS-Dom
class DragEventMock extends Event {
  dataTransfer: {
    getData: jest.Mock<any, [string]>;
    setData: jest.Mock<any, [string, string]>;
  };
  constructor(type: string, eventInitDict?: EventInit) {
    super(type, eventInitDict);
    this.dataTransfer = {
      getData: jest.fn(),
      setData: jest.fn(),
    };
  }
}
(globalThis as any).DragEvent = DragEventMock;
