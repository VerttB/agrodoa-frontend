import { useState, useCallback } from "react";

type AlertType = "success" | "error" | "warning" | "info";

export function useAlert() {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState<AlertType>("info");

  const showAlert = useCallback((msg: string, alertType: AlertType = "info", duration = 4000) => {
    setMessage(msg);
    setType(alertType);
    setShow(true);

    if (duration > 0) {
      setTimeout(() => {
        setShow(false);
      }, duration);
    }
  }, []);

  const hideAlert = useCallback(() => {
    setShow(false);
  }, []);

  return { show, message, type, showAlert, hideAlert };
}
