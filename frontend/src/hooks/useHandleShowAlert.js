import React, { useState, useEffect } from "react";

export const useHandleShowAlert = () => {
  const [alertInfo, setAlertInfo] = useState({
    position: null,
    status: null,
    text: null,
  });
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [showAlert]);

  const handleShowAlert = (p, s, t) => {
    setShowAlert(true);
    setAlertInfo({
      position: p,
      status: s,
      text: t,
    });
  };
  return { alertInfo, showAlert, handleShowAlert };
};
