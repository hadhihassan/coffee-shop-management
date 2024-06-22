import { Outlet } from 'react-router-dom';
import SideBar from './SideBar'

export default function Index() {
    return (
        <div  className='w-[100%]'>
            <div>
                <SideBar  >
                    <Outlet/>
                </SideBar>
            </div>
        </div>
    )
}
