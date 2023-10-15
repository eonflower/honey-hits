import { configureStore } from '@reduxjs/toolkit'; // Import from Redux Toolkit
import reducer from './reducer';


const store = configureStore({
  reducer: {
    app: reducer, // You can name the slice (reducer) as 'app'
    // Add more slices as needed
  },
});

export default store;