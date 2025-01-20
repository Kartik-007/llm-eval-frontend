"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, ShieldAlert, Menu, User, LogOut } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const routes = [
  {
    label: "Security Testing",
    icon: ShieldAlert,
    href: "/security",
    color: "text-red-500",
  },
  {
    label: "Performance Testing",
    icon: Activity,
    href: "/performance",
    color: "text-blue-500",
  },
  {
    label: "Tasks",
    icon: Menu,
    href: "/tasks",
    color: "text-green-500",
  },
] as const

function SidebarNav() {
  const pathname = usePathname()
  const { state } = useSidebar()
  const isCollapsed = state === "collapsed"

  return (
    <>
      <SidebarHeader className="flex flex-col">
        <div className={cn(
          "flex h-14 items-center px-4",
          isCollapsed && "justify-center px-2"
        )}>
          <SidebarTrigger className={cn(
            "h-8 w-8",
            isCollapsed && "mx-auto"
          )} />
          <h2 className={cn(
            "ml-2 text-lg font-semibold transition-all duration-300",
            isCollapsed && "hidden"
          )}>
            LLM Evaluation
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => {
            const Icon = route.icon
            const isActive = pathname === route.href

            return (
              <SidebarMenuItem key={route.href}>
                <Link href={route.href} className="w-full">
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={route.label}
                    className={cn(
                      "w-full",
                      isCollapsed && "mx-auto"
                    )}
                  >
                    <Icon className={cn("h-8 w-8", route.color)} />
                    <span className={cn(
                      "ml-2",
                      isCollapsed && "hidden"
                    )}>
                      {route.label}
                    </span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton 
              tooltip="User Profile"
              className={cn(
                "w-full",
                isCollapsed && "justify-center px-2"
              )}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 shrink-0">
                <User className="h-4 w-4" />
              </div>
              <span className={cn(
                "ml-2",
                isCollapsed && "hidden"
              )}>
                User Profile
              </span>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </>
  )
}

export function AppSidebar() {
  const [open, setOpen] = React.useState(true)

  return (
    <SidebarProvider defaultOpen={true} open={open} onOpenChange={setOpen}>
      <Sidebar collapsible="icon" className="border-r">
        <SidebarNav />
      </Sidebar>
    </SidebarProvider>
  )
}