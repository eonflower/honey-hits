// import React from 'react';
// import renderer from 'react-test-renderer';

// test('refreshToken function is called when oneminuteless is less than current time', () => {
//   const refreshToken = jest.fn();
//   const access_token = 'some_access_token';
//   const refresh_token = 'some_refresh_token';
//   const tokenEvents = ['mousemove', 'keydown'];
  
//   const window = { addEventListener: jest.fn() };
//   const setToken = jest.fn();
//   const checkTime = jest.fn(() => true);

//   // Mock window.addEventListener
//   const addEventListener = jest.spyOn(window, 'addEventListener');
//   addEventListener.mockImplementation((_, callback) => {
//     callback();
//   });

//   // Render the component with the useEffect hook
//   renderer.act(() => {
//     (<App refreshToken={refreshToken} access_token={access_token} refresh_token={refresh_token} tokenEvents={tokenEvents} setToken={setToken} checkTime={checkTime} />);
//   });

//   // Expect refreshToken to have been called
//   expect(refreshToken).toHaveBeenCalledWith(refresh_token);

//   // Restore the original implementation of window.addEventListener
//   addEventListener.mockRestore();
import React from 'react';
import renderer from 'react-test-renderer';
require = require("esm")(module);
import config from "../utils/config";
import App from '../App.jsx'; // Import the App component here

test('refreshToken function is called when oneminuteless is less than current time', () => {
  const refreshToken = jest.fn();
  const access_token = 'some_access_token';
  const refresh_token = 'some_refresh_token';
  const tokenEvents = ['mousemove', 'keydown'];
  jest.mock('../utils/config')
  
  const window = { addEventListener: jest.fn() };
  const setToken = jest.fn();
  const checkTime = jest.fn(() => true);

  // Mock window.addEventListener
  const addEventListener = jest.spyOn(window, 'addEventListener');
  addEventListener.mockImplementation((_, callback) => {
    callback();
  });

  // Render the component with the useEffect hook
  renderer.act(() => {
    (<App refreshToken={refreshToken} access_token={access_token} refresh_token={refresh_token} tokenEvents={tokenEvents} setToken={setToken} checkTime={checkTime} />);
  });

  // Expect refreshToken to have been called
  expect(refreshToken).toHaveBeenCalledWith(refresh_token);

  // Restore the original implementation of window.addEventListener
  addEventListener.mockRestore();
});