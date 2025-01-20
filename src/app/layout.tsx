// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { AppSidebar } from "@/components/app-sidebar"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "LLM Evaluation Platform",
//   description: "Platform for evaluating LLM performance and security",
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <div className="grid min-h-screen w-full">
//           {/* Sidebar */}
//           <AppSidebar />
//           {/* Main Content */}
//           <main className="grid w-full">
//             <div className="container py-6">
//               {children}
//             </div>
//           </main>
//         </div>
//       </body>
//     </html>
//   )
// }

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LLM Evaluation Platform",
  description: "Platform for evaluating LLM performance and security",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative min-h-screen flex">
          {/* Sidebar */}
          <div className="sticky top-0">
            <AppSidebar />
          </div>
          
          {/* Main Content */}
          <div className="flex-1 pl-[--sidebar-width] min-h-screen">
            <main>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}