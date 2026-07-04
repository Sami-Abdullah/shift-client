export default function OrderTimeline({ timeline }) {
  const statusColors = {
    pending:    "bg-muted-foreground",
    processing: "bg-[#fbbf24]",
    shipped:    "bg-[#60a5fa]",
    delivered:  "bg-[#4ade80]",
    cancelled:  "bg-[#f87171]",
  };

  return (
    <div className="border border-border bg-muted p-6">
      <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground mb-5 pb-4 border-b border-border">
        Order Timeline
      </p>

      <div className="flex flex-col gap-0">
        {[...timeline].reverse().map((event, i) => (
          <div key={i} className="flex gap-4 pb-5 last:pb-0 relative">
            {i < timeline.length - 1 && (
              <div className="absolute left-[5px] top-3 w-px h-full bg-border" />
            )}
            <div className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${statusColors[event.status] || "bg-muted-foreground"}`} />
            <div>
              <p className="text-[12px] font-medium text-foreground">{event.note}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">
                {new Date(event.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}