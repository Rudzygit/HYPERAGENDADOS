import { useState, useEffect, useCallback } from "react";
import { IoClose } from "react-icons/io5";

interface AlertProps {
  message: string;
  onClose?: () => void;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
}

const Alert = ({
  message,
  onClose,
  type = "info",
  duration = 5000,
}: AlertProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isLeaving, setIsLeaving] = useState(false);

  const handleClose = useCallback(() => {
    setIsLeaving(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 400); // Ajustado a 400ms para coincidir con la duración de la animación
  }, [onClose]);

  useEffect(() => {
    // Temporizador para auto-cerrar
    const closeTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(closeTimer);
    };
  }, [duration, handleClose]);

  if (!isVisible) return null;

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`
        flex items-center justify-between
        ${bgColors[type]} text-white
        px-4 py-2 rounded-lg
        shadow-lg
        min-w-[280px] max-w-[400px]
        ${isLeaving ? "animate-slide-out-right" : "animate-slide-in-right"}
        transition-all duration-400 ease-in-out
        hover:translate-x-[-4px]
      `}
    >
      <span className="mr-4 text-sm font-medium">{message}</span>
      <button
        onClick={handleClose}
        className="text-white hover:text-gray-200 transition-colors p-1 rounded-full hover:bg-white/10 cursor-pointer"
      >
        <IoClose size={20} />
      </button>
    </div>
  );
};

export default Alert;
