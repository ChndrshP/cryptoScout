import React from 'react'

const Layout = ({children}) => {
  return (
    <div className='app-container'>
      <Navbar/>
      <main className='main-content'>
        {children}
      </main>
      <Footer/>
    </div>
  )
}

export default Layout;