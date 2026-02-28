"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingCart,
  Boxes,
  BarChart3,
  ArrowRightLeft,
  ArrowDownCircle,
} from "lucide-react";

const menu = [
  { name: "Overview", href: "/overview", icon: LayoutDashboard },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  {
    name: "Inventory",
    href: "/inventory",
    icon: Boxes,
    children: [
      { name: "Production", href: "/inventory/production", icon: ArrowDownCircle },
      { name: "Transfer", href: "/inventory/transfer", icon: ArrowRightLeft },
    ],
  },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export default function Sidebar({ open, setOpen }: { open: any, setOpen: any }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 pt-12 md:pt-0 w-60 transform border-r border-slate-800 bg-slate-950 transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0
        `}
      >
        <Link
          href="/"
          className="flex h-16 items-center px-5 text-lg font-semibold uppercase tracking-widest text-amber-500"
          onClick={() => setOpen(false)}
        >
          KacangRebus
        </Link>

        <nav className="space-y-1 px-3">
          {menu.map((item) => {
            const Icon = item.icon;
            const isActiveParent = pathname.startsWith(item.href);

            return (
              <div key={item.name}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                ${isActiveParent
                      ? "bg-amber-500/20 text-amber-400"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                    }`}
                >
                  <Icon size={18} />
                  {item.name}
                </Link>

                {item.children && isActiveParent && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => {
                      const isActiveChild = pathname === child.href;
                      const Icon = child.icon;

                      return (
                        <Link
                          key={child.name}
                          href={child.href}
                          onClick={() => setOpen(false)}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition
                            ${isActiveChild
                              ? "bg-amber-500/20 text-amber-400"
                              : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                            }`}
                        >
                          <Icon size={18} />
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
        {/* <nav className="space-y-1 px-3"> */}
        {/*   {menu.map((item) => { */}
        {/*     const Icon = item.icon; */}
        {/*     const active = pathname.startsWith(item.href); */}
        {/**/}
        {/*     return ( */}
        {/*       <Link */}
        {/*         key={item.name} */}
        {/*         href={item.href} */}
        {/*         onClick={() => setOpen(false)} */}
        {/*         className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition */}
        {/*           ${active */}
        {/*             ? "bg-amber-500/20 text-amber-400" */}
        {/*             : "text-slate-400 hover:bg-slate-800 hover:text-slate-200" */}
        {/*           }`} */}
        {/*       > */}
        {/*         <Icon size={18} /> */}
        {/*         {item.name} */}
        {/*       </Link> */}
        {/*     ); */}
        {/*   })} */}
        {/* </nav> */}
      </aside>
    </>
  );
}
