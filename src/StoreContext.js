import React, {} from 'react';
import { TodoStore } from './store/TodoStore';
import TodoTransport from './transports/TodoTransport.js';

const toDoTransport = new TodoTransport()
const store = new TodoStore(toDoTransport)

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  return (
      <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

export {StoreContext, StoreProvider}