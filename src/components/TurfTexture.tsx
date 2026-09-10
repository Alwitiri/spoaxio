"use client";

export default function TurfTexture() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9999,
          backgroundImage: [
            "radial-gradient(ellipse 1.2px 4px at 1px 2px, rgba(0,230,118,0.07) 50%, transparent 50%)",
            "radial-gradient(ellipse 1px 5px at 3px 1px, rgba(0,200,83,0.055) 50%, transparent 50%)",
            "radial-gradient(ellipse 0.8px 3.5px at 0px 3px, rgba(0,180,60,0.045) 50%, transparent 50%)",
            "radial-gradient(ellipse 1px 4.5px at 2px 0px, rgba(0,160,50,0.04) 50%, transparent 50%)",
          ].join(", "),
          backgroundSize: "5px 7px, 7px 9px, 6px 8px, 8px 10px",
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 9998,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(0,230,118,0.025) 30%, rgba(0,200,83,0.035) 60%, rgba(0,230,118,0.015) 100%)",
        }}
      />
    </>
  );
}
