import Sidebar from '../../Components/AdminCom/Sidebar'
import AdminNav from '../../Components/AdminCom/AdminNav'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <AdminNav/>
    <div className='flex'>
      <Sidebar/>
      <div className='flex-1 px-4 py-10 h-[calc(100vh-64px)] overflow-y-auto'>
        <Outlet/>
      </div>
    </div>
    
    </>
  )
}

export default Layout
