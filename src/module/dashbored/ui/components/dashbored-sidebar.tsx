"use client";
import { Separator } from "@/components/ui/separator";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import DashboredUserButton from "./dashbored-user-button";

const fristSection = [
  {
    icon: VideoIcon,
    label: " Meetings",
    href: "/meetings",
  },
  {
    icon: BotIcon,
    label: " Agents",
    href: "/agents",
  },
];

const secondSection = [
  {
    icon: StarIcon,
    label: " Upgrade",
    href: "/upgrade",
  },
];

const DashboredSidebar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2">
          <Image src="/logo.svg" alt="MeetAi" width={36} height={36}></Image>
          <p className="font-semibold text-2xl "> MeetAi</p>
        </Link>
      </SidebarHeader>
      <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5d6b68]"></Separator>
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {fristSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      " h-10 hover:bg-linear-to-r/oklch border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50  ",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5d6b68]/10 "
                    )}
                    isActive={pathname == item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="font-medium text-sm tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="px-4 py-2">
        <Separator className="opacity-10 text-[#5d6b68]"></Separator>
      </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      " h-10 hover:bg-linear-to-r/oklch border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50  ",
                      pathname === item.href &&
                        "bg-linear-to-r/oklch border-[#5d6b68]/10 "
                    )}
                    isActive={pathname == item.href}
                  >
                    <Link href={item.href}>
                      <item.icon className="mr-2 h-4 w-4" />
                      <span className="font-medium text-sm tracking-tight">
                        {item.label}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <DashboredUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboredSidebar;
