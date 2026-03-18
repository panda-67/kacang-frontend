"use client";

import Card from "@/components/ui/Card";
import { formatDateID } from "@/lib/utils";
import { useBusinessDay } from "./useBusinessDay";
import { useState } from "react";

export default function MultiLocationOverviewPage() {
  const { businessDays, loadingMap, locations, type, setType, handleOpen, handleClose } = useBusinessDay();
  const [amount, setAmount] = useState("");
  const [showAmountModal, setShowAmountModal] = useState(false);
  const [closingLocation, setClosingLocation] = useState("");

  const onClickClose = (locationId: string, type: string) => {
    if (type === "sales_point") {
      setClosingLocation(locationId);
      setShowAmountModal(true);
    } else {
      handleClose(locationId, null);
    }
  };
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

                {bd && bd.status === "open" && (
                  <button
                    disabled={loading}
                    onClick={() => onClickClose(location.id, type)}
                    className="px-4 py-2 rounded-md bg-slate-500 text-white text-sm cursor-pointer"
                  >
                    Close Business Day
                  </button>
                )}

                {(!bd || bd.status === "closed") && (
                  <button
                    disabled={loading}
                    onClick={() => handleOpen(location.id)}
                    className="px-4 py-2 rounded-md bg-amber-500 text-white text-sm cursor-pointer"
                  >
                    Open Business Day
                  </button>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {showAmountModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-slate-950 border border-slate-800 p-4 rounded-md w-80 space-y-3">
            <h3 className="text-sm font-medium">Enter Cash Amount</h3>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full border border-slate-800 rounded px-2 py-1 text-sm"
              placeholder="Cash counted"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAmountModal(false)}
                className="px-3 py-1 text-sm border border-slate-800 rounded cursor-pointer"
              >
                Cancel
              </button>

              <button
                disabled={!amount}
                onClick={() => {
                  handleClose(closingLocation, amount);
                  setShowAmountModal(false);
                  setAmount("");
                }}
                className="px-3 py-1 text-sm bg-slate-600 text-white rounded cursor-pointer disabled:cursor-not-allowed"
              >
                Confirm Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
