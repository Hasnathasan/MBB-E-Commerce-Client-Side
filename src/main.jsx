import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { NextUIProvider } from "@nextui-org/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider>
      <AuthProvider>
        <div className="bg-[#fcfcfc] max-w-[1920px] mx-auto">
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
    </NextUIProvider>
  </React.StrictMode>
);
