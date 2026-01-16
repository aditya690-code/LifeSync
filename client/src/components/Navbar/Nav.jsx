import React,{ useRef } from 'react'
import { Menu , TrendingUp} from "lucide-react";
import { useGSAP} from '@gsap/react';
import gsap from 'gsap';

const Nav = ({handleSidebar}) => {

    const navRef = useRef(null);
    useGSAP(()=>{
        const tl = gsap.timeline()
        tl.from(".logo .img",{
            x: -200,
            opacity:0,
            delay:0.1,
            duration:0.6,
        });
        tl.from(".logo .font",{
            x: -200,
            opacity:0,
            duration:0.4,
        });
        tl.from('.menu',{
            x: 200,
            duration:0.6,
            opacity:0
        },"-=0.4");

    },{scope:navRef});

    return (
        <nav className='flex justify-between' ref={navRef}>
            <div className=" logo flex items-center gap-1.5 p-4 cursor-pointer" onClick={()=>  window.location.href = '/home'}>
                <div className="img bg-indigo-600 text-white p-1.5 rounded-lg">
                    <img src="/logo2.png" alt="" className='h-5'/>
                </div>
                <span className="font font-bold text-2xl ml-0.5 tracking-tight">LifeSync</span>
            </div>
            <div className="menu cursor-pointer flex items-center justify-center p-4 pr-8">
                <Menu size={30} color="#111" strokeWidth={2} onClick={handleSidebar}/>{/*333*/}
            </div>
        </nav>
    )
}

export default Nav
