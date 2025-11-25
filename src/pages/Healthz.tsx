import SEOHead from "@/components/SEOHead";

const Healthz = () => {
  const payload = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: 0,
    environment: "production",
  } as const;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <SEOHead
        title="Health Check - Mare Nostrum"
        description="Endpoint technique de supervision du site Mare Nostrum"
        noindex={true}
      />
      <main className="w-full max-w-xl px-4">
        <section className="rounded-lg border border-border bg-muted px-4 py-3 shadow-sm">
          <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">
            {JSON.stringify(payload, null, 2)}
          </pre>
        </section>
      </main>
    </div>
  );
};

export default Healthz;
