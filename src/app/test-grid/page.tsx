"use client";
import { AgGridReact } from "ag-grid-react";
import type { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface Car { make: string; model: string; price: number; }

export default function TestGrid() {
  const colDefs: ColDef<Car>[] = [
    { field: "make" as any, editable: true, cellEditor: "agSelectCellEditor", cellEditorParams: { values: ["Toyota", "Ford", "Honda"] } },
    { field: "model" as any, editable: true },
    { field: "price" as any, editable: true, type: "numericColumn" },
  ];
  const rowData: Car[] = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-lg font-bold mb-4">AG Grid Test</h1>
      <div className="ag-theme-quartz" style={{ height: 200, width: 600 }}>
        <AgGridReact rowData={rowData} columnDefs={colDefs} />
      </div>
    </div>
  );
}
