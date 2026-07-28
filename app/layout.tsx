import type { Metadata } from 'next'
import './globals.css'
import Sidebar from '@/components/uacs/Sidebar'
import TopBar from '@/components/uacs/TopBar'

export const metadata: Metadata = {
  title: 'UACS Project',
  description: 'Universal Autonomous Coding System — Strategic Minds',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="main-content">{children}</div>
      </body>
    </html>
  )
}
