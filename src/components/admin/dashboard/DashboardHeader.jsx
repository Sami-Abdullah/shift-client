export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-GB", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric",
  });

  return (
    <div className="mb-8">
      <p className="text-eyebrow mb-1">Overview</p>
      <h1 className="text-display text-foreground">Dashboard</h1>
      <p className="text-caption mt-2">{today}</p>
    </div>
  );
}