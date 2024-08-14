// components/ToasterProvider.js
import { Toaster } from "react-hot-toast";

const ToasterProvider = () => {
  return (
    <Toaster
      position="bottom-right"
      reverseOrder={false}
      containerClassName="toaster-container"
      toastOptions={{
        duration: 3000,
        style: {
          background: "#fff",
          color: "black",
          borderRadius: "0",
          padding: "0px",
          width: "20rem",
        },
      }}
    />
  );
};

export default ToasterProvider;
