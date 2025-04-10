import Alert from "./Alert";

interface AlertItem {
  message: string;
  type: "success" | "error" | "warning" | "info";
}

interface AlertContainerProps {
  alerts: AlertItem[];
  onClose: (index: number) => void;
}

const AlertContainer = ({ alerts, onClose }: AlertContainerProps) => {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {alerts.map((alert, index) => (
        <Alert
          key={index}
          message={alert.message}
          type={alert.type}
          onClose={() => onClose(index)}
        />
      ))}
    </div>
  );
};

export { AlertContainer, type AlertItem };
