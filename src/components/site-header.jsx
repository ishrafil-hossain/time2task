import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  AlarmCheckIcon,
  BellIcon,
  FolderCog,
  Grip,
  ListTodoIcon,
  MessageCircleMore,
  PlusIcon,
  SheetIcon,
} from "lucide-react";
import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import QuickActions from "./SiteHeaderComp/QuickActions";
import AppsLibrary from "./SiteHeaderComp/AppsLibrary";

export function SiteHeader() {
  const [date, setDate] = React.useState(new Date());

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b bg-white transition-all ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <div className=" w-full flex items-center justify-between ">
          <button className="relative inline-flex items-center rounded-full p-[1px] bg-gradient-to-l from-[#009dda] to-[#294dff]">
            <span className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-full bg-white">
              <AlarmCheckIcon className="w-5 text-[#294DFF]" />
              <p className="text-base font-semibold leading-[19px] bg-gradient-to-l from-[#009dda] to-[#294dff] bg-clip-text text-transparent">
                00 : 00 : 00
              </p>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-gray-200 hidden lg:flex">
              <BellIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 hidden lg:flex">
              <FolderCog className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 hidden lg:flex">
              <ListTodoIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 hidden lg:flex">
              <SheetIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 hidden lg:flex">
              {/* <ChartAreaIcon className="w-5 h-5 text-gray-600" /> */}
              <MessageCircleMore className="w-5 h-5 text-gray-600 hidden lg:flex" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-200 hidden lg:flex">
              <CalendarIcon className="w-5 h-5 text-gray-600" />
            </button>
            <QuickActions />

            <Separator
              className="bg-[#D9D9D9] w-[2px] h-7 hidden lg:flex"
              orientation="vertical"
            />
            <AppsLibrary />
          </div>
        </div>
      </div>
    </header>
  );
}
