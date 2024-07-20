import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';

const Layout: React.FC = () => {
  return (
    <div className='md:container mx-auto py-6 px-4 min-h-screen'>
      <>
        <Header />
      </>
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout;