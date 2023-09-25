import React from "react";
import "@/app/global.css";
const layout = ({ children }: any) => {
  return (
    <html>
      <body className="grid place-items-center min-h-screen bg-gray-200">
        {children}
      </body>
    </html>
  );
};

export default layout;
