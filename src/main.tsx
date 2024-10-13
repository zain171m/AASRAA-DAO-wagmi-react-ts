import { Buffer } from "buffer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import Sidebar from "./Sidebar.tsx";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import Navbar from "./Navbar.tsx";
import Home from "./Home.tsx";
import Unapproved from "./Unapproved.tsx";
import Create from "./Create.tsx";
import CampaignDetails from "./CampaignDetails.tsx";
import "./index.css";
import config from "./config.ts";

globalThis.Buffer = Buffer;

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          {/* <App /> */}
          <div className="relative min-h-screen flex bg-zinc-900">
            <div className="hidden md:block border-r border-sm border-zinc-800">
              <Sidebar />
            </div>
            <div className="flex-1">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Unapproved" element={<Unapproved />} />
                <Route path="/Create" element={<Create />} />
                <Route
                  path="/details/:id"
                  element={<CampaignDetails />}
                ></Route>
              </Routes>
            </div>
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);
