import ReactDOM from "react-dom/client";
import Notification from "../components/Notification";

export const showNotification = (message: string, type: "error" | "success" | "info" = "info", duration = 3000) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);

  const removeNotification = () => {
    root.unmount();
    document.body.removeChild(container);
  };

  root.render(
    <Notification message={message} type={type} duration={duration} onClose={removeNotification} />
  );
};