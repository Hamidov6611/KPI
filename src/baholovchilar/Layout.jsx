import React from 'react'
import B_Header from './B_Header'

const Layout = ({children}) => {
  return (
    <div>
        <B_Header />
        <main>
            {children}
        </main>
    </div>
  )
}

export default Layout