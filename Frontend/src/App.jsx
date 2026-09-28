import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllNotes from "./pages/AllNotes";
import Pinned from "./pages/Pinned";
import Archived from "./pages/Archived";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ProviderContext from "./context/Provider";
import { Toaster, toast } from "sonner";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        expand={false}
        duration={3000}
        offset={10}
      />
      <ProviderContext>
        <Provider store={store}>
          <div className="min-h-screen w-full bg-background text-text">
            {/* Fixed sidebar */} <Sidebar /> {/* Main application area */}
            <div className="min-w-0 md:ml-64">
              <Navbar />
              <main className="min-w-0 px-4 py-5 pb-24 sm:px-6 sm:py-6 md:pb-6 lg:px-8">
                <div className="mx-auto w-full max-w-[1800px]">
                  <Routes>
                    <Route path="/" element={<AllNotes />} />
                    <Route path="/pinned" element={<Pinned />} />
                    <Route path="/archived" element={<Archived />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </Provider>
      </ProviderContext>
    </>
  );
}

export default App;
