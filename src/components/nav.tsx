import { Button } from "@/components/ui/button"
import Link from "next/link"

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
      <Link href="/security">
        <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
          Security Testing
        </Button>
      </Link>
      <Link href="/performance">
        <Button variant="ghost" className="text-sm font-medium transition-colors hover:text-primary">
          Performance Testing
        </Button>
      </Link>
    </nav>
  )
}