"use client";

import Card from "@/components/ui/Card";
import { formatDateID } from "@/lib/utils";
import { useBusinessDay } from "./useBusinessDay";

export default function MultiLocationOverviewPage() {
  const { businessDays, loadingMap, locations, type, setType, handleOpen, handleClose } = useBusinessDay();

  return (
    <div className="space-y-8">

      <div className="flex gap-3 flex-col justify-center md:flex-row  md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Multi-Location Control
          </h1>
          <p className="text-sm text-slate-400">
            Manage business day per location
          </p>
        </div>
        <div className="flex rounded-lg border border-slate-700 overflow-hidden w-max">
          <button
            onClick={() => setType("sales_point")}
            className={`px-4 py-2 text-sm ${type === "sales_point"
              ? "bg-amber-500 text-white"
              : "bg-slate-800 text-slate-400"
              }`}
          >
            Sale Points
          </button>
          <button
            onClick={() => setType("central")}
            className={`px-4 py-2 text-sm ${type === "central"
              ? "bg-amber-500 text-white"
              : "bg-slate-800 text-slate-400"
              }`}
          >
            Central
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {locations.map((location) => {
          const bd = businessDays[location.id];
          const isOpen = bd?.status === "open";
          const loading = loadingMap[location.id];

          return (
            <Card key={location.id}>
              <div className="space-y-4">
                <div>
                  <h3 className="text-md font-semibold">
                    {location.name}
                  </h3>
                  <p
                    className={`text-xs uppercase tracking-wide ${isOpen
                      ? "text-emerald-400"
                      : "text-rose-400"
                      }`}
                  >
                    {isOpen ? "OPEN" : "CLOSED"}
                  </p>
                </div>

                {bd && bd.status === "open" && (
                  <div className="text-sm text-slate-400 space-y-1">
                    <p>Opened at: {formatDateID(bd.opened_at)}</p>
                    <p>Opened by: {bd.opened_by}</p>
                  </div>
                )}

                {bd && bd.status === "closed" && (
                  <div className="text-sm text-slate-400 space-y-1">
                    <p>Closed at: {formatDateID(bd.closed_at)}</p>
                    <p>Closed by: {bd.closed_by}</p>
                  </div>
                )}

                {type === "central" && bd && bd.status === "open" && (
                  <button
                    disabled={loading}
                    onClick={() => handleClose(location.id)}
                    className="px-4 py-2 rounded-md bg-slate-500 text-white text-sm"
                  >
                    Close Business Day
                  </button>
                )}

                {(!bd || bd.status === "closed") && (
                  <button
                    disabled={loading}
                    onClick={() => handleOpen(location.id)}
                    className="px-4 py-2 rounded-md bg-amber-500 text-white text-sm"
                  >
                    Open Business Day
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
