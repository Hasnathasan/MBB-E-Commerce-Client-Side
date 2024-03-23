import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <AuthProvider>
          <div className="bg-[#fcfcfc] max-w-[1920px] overflow-hidden mx-auto">
            <RouterProvider router={router} />
          </div>
        </AuthProvider>
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
