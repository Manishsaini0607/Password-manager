export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 bg-gradient-to-br from-emerald-50 to-green-100">
      {/* Enhanced grid with better opacity and sizing */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(34,197,94,0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgba(34,197,94,0.15)_1px,transparent_1px)] bg-[size:3rem_3rem] animate-pulse"></div>
    </div>
  );
}
