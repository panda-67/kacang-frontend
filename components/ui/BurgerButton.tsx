'use client'

export default function BurgerButton({ open, setOpen }: { open: any, setOpen: any }) {
  return (
    <button
      onClick={() => setOpen(!open)}
      aria-label="Toggle Menu"
      aria-expanded={open}
      className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 md:hidden"
    >
      <span
        className={`absolute h-0.5 w-5 bg-slate-300 transition-transform duration-300
          ${open ? "translate-y-0 rotate-45" : "-translate-y-1.5"}
        `}
      />
      <span
        className={`absolute h-0.5 w-5 bg-slate-300 transition-opacity duration-300
          ${open ? "opacity-0" : "opacity-100"}
        `}
      />
      <span
        className={`absolute h-0.5 w-5 bg-slate-300 transition-transform duration-300
          ${open ? "translate-y-0 -rotate-45" : "translate-y-1.5"}
        `}
      />
    </button>
  );
}
