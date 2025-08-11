import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export default function ProjectBudget({ budgetEnabled, setBudgetEnabled, budgetType, setBudgetType, projectData }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">
          Project Budget & Hours:
        </Label>
        <Switch
          checked={budgetEnabled}
          onCheckedChange={setBudgetEnabled}
        />
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-out",
          budgetEnabled ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-4 pt-2">
          <Tabs defaultValue="billing" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="billing"
                className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
              >
                Project Billing
              </TabsTrigger>
              <TabsTrigger value="budget">Project Budget</TabsTrigger>
            </TabsList>
            <TabsContent value="billing" className="space-y-4 mt-4">
              <RadioGroup
                value={budgetType}
                onValueChange={setBudgetType}
                className="space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" />
                    <Label htmlFor="hourly" className="font-medium">
                      Hourly Rate
                    </Label>
                  </div>
                  {budgetType === "hourly" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 ml-6">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select rate" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectData?.hourly_rate_types?.map((rate) => (
                            <SelectItem key={rate.value} value={rate.value}>
                              {rate.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Input placeholder="$0.00" />
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed" className="font-medium">
                      Fixed Budget
                    </Label>
                  </div>
                  {budgetType === "fixed" && (
                    <div className="ml-6">
                      <Input placeholder="$0.00" className="max-w-xs" />
                    </div>
                  )}
                </div>
              </RadioGroup>
            </TabsContent>
            <TabsContent value="budget" className="space-y-4 mt-4">
              <div className="space-y-4">
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <Label
                        htmlFor="budget-select"
                        className="text-sm text-gray-600 mb-1 block"
                      >
                        Budget
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Budget" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectData?.budget_types?.map((budget) => (
                            <SelectItem key={budget.value} value={budget.value}>
                              {budget.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="employee-rate"
                        className="text-sm text-gray-600 mb-1 block"
                      >
                        Rate
                      </Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Rate" />
                        </SelectTrigger>
                        <SelectContent>
                          {projectData?.based_on?.map((rate) => (
                            <SelectItem key={rate.value} value={rate.value}>
                              {rate.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}