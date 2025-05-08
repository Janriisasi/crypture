import React from "react";
import { Toaster } from 'react-hot-toast';
import Homepage from "./pages/homepage";

function App() {
  return (
    <>
    <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
    <div className="App">
      <Homepage />
    </div>
    </>
  );
}

export default App;