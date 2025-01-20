"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { Activity, Menu, ShieldAlert } from "lucide-react"

const routes = [
  {
    value: "/security",
    label: "Security Testing",
    icon: ShieldAlert,
    color: "text-red-500",
  },
  {
    value: "/performance",
    label: "Performance Testing",
    icon: Activity,
    color: "text-blue-500",
  },
  {
    value: "/tasks",
    label: "Tasks",
    icon: Menu,
    color: "text-green-500",
  },
]

export function MainNav() {
  const pathname = usePathname()
  const currentTab = routes.find((route) => pathname.startsWith(route.value))?.value || routes[0].value

  return (
    <Tabs value={currentTab} className="w-full max-w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        {routes.map((route) => (
          <TabsTrigger
            key={route.value}
            value={route.value}
            className="flex items-center gap-2"
            asChild
          >
            <Link href={route.value}>
              <route.icon className={cn("h-4 w-4", route.color)} />
              <span className="hidden md:inline">{route.label}</span>
              <span className="md:hidden">{route.label.split(" ")[0]}</span>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}