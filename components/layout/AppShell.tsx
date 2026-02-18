"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./TopBar";

export default function AppShell({ children, }: { children: React.ReactNode; }) {

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col">
        <Topbar open={open} setOpen={setOpen} />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto w-full max-w-screen-2xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
