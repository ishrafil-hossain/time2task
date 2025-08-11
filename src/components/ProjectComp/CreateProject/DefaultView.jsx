import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function DefaultView({ selectedView, setSelectedView }) {
  return (
    <div>
      <Label className="text-sm font-medium mb-3 block">
        Choose Default View:
      </Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card
          className={cn(
            "cursor-pointer transition-all",
            selectedView === "table" ? "ring-2 ring-green-500" : ""
          )}
          onClick={() => setSelectedView("table")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded opacity-80"></div>
              </div>
              <div>
                <h4 className="font-medium">Table</h4>
                <p className="text-xs text-gray-600">
                  See your work in a spreadsheet format.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "cursor-pointer transition-all",
            selectedView === "board" ? "ring-2 ring-blue-500" : ""
          )}
          onClick={() => setSelectedView("board")}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <div className="w-6 h-6 bg-white rounded opacity-80"></div>
              </div>
              <div>
                <h4 className="font-medium">Board</h4>
                <p className="text-xs text-gray-600">
                  See your work in a spreadsheet format.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 