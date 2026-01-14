const Healthz = () => {
  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    service: "marenostrum-web"
  };

  return (
    <pre 
      style={{ 
        margin: 0, 
        padding: 0, 
        background: "white", 
        color: "black", 
        fontFamily: "monospace", 
        fontSize: "14px",
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start"
      }}
    >
      {JSON.stringify(payload)}
    </pre>
  );
};

export default Healthz;
