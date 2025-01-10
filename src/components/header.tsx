import { MainNav } from "@/components/nav"

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="font-bold text-2xl">LLM Evaluation Platform</div>
        <MainNav />
      </div>
    </div>
  )
}