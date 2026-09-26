import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllNotes from "./pages/AllNotes";
import Pinned from "./pages/Pinned";
import Archived from "./pages/Archived";
import Trash from "./pages/Trash";
import Setting from "./pages/Setting";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProviderContext from "./context/Provider";

function App() {
  return (
    <>
      <ProviderContext>
        <Provider store={store}>
          <div className="w-screen h-screen bg-background text-text flex">
            <div className=" h-full flex-1">
              <Sidebar />
            </div>
            <div className="flex-6 flex flex-col">
              <Navbar />
              <div className="w-full h-full p-8">
                <Routes>
                  <Route path="/" element={<AllNotes />} />
                  <Route path="/pinned" element={<Pinned />} />
                  <Route path="/archived" element={<Archived />} />
                  <Route path="/trash" element={<Trash />} />
                  <Route path="/setting" element={<Setting />} />
                </Routes>
              </div>
            </div>
          </div>
        </Provider>
      </ProviderContext>
    </>
  );
}

export default App;
