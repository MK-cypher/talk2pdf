"use client";
import {signOut} from "@/app/(auth)/actions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {LogOut, Settings, UserCircle2} from "lucide-react";
import Link from "next/link";

export default function UserBtn({user}: {user: any}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserCircle2 />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-40" align="end">
        <DropdownMenuItem className="p-0">
          <Link href={"/dashboard/settings"} className="px-2 py-1.5 flex items-center cursor-pointer gap-1 w-full">
            <Settings /> Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut} className="">
          <div className="flex items-center cursor-pointer gap-1 w-full">
            <LogOut /> Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
