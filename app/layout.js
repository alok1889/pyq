import React from 'react'
import '@/assets/styles/globals.css';

export const metadata = {
    title: 'Propert Rental',
    description: 'Find your dream home',
    keywords: 'rental, find rentals',
}
const MainLayout = ({children}) => {
  return (
    <html lang="en">
    <body>
    <div>
    {children}
    </div>
    </body>
  </html>
  )
}

export default MainLayout
