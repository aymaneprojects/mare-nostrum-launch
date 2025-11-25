import { useEffect } from "react";

const Healthz = () => {
  useEffect(() => {
    const startTime = performance.now();
    const payload = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: startTime / 1000,
      environment: "production",
    };
    
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#0f0";
    document.body.style.fontFamily = "monospace";
    
    const root = document.getElementById("root");
    if (root) {
      root.style.margin = "0";
      root.style.padding = "0";
    }
  }, []);

  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: performance.now() / 1000,
    environment: "production",
  };

  return (
    <pre style={{ margin: 0, padding: 0, backgroundColor: "#000", color: "#0f0", fontFamily: "monospace", fontSize: "14px" }}>
      {JSON.stringify(payload)}
    </pre>
  );
};

export default Healthz;
