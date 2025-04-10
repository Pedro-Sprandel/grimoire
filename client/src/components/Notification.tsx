import React, { useEffect } from "react";
import ReactDOM from "react-dom";

type NotificationProps = {
  message: string;
  type?: "error" | "success" | "info";
  duration?: number; // Tempo em milissegundos antes de desaparecer
  onClose?: () => void;
};

const Notification: React.FC<NotificationProps> = ({ message, type = "info", duration = 3000, onClose }) => {
  const bgColor =
    type === "error" ? "bg-red-500" : type === "success" ? "bg-green-500" : "bg-blue-500";

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose) {onClose();}
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return ReactDOM.createPortal(
    <div
      className={`fixed top-4 right-4 p-4 rounded shadow-lg text-white ${bgColor} z-50`}
    >
      {message}
    </div>,
    document.body
  );
};

export default Notification;