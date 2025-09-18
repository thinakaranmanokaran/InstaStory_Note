import React from 'react'
import MobileView from './components/MobileView'
import { div } from 'framer-motion/client'

const App = () => {
    return (
        <div className='font-dmsans'>
            <div className='md:hidden '><MobileView /></div>
            <div className='text-center text-6xl font-bold tracking-tighter md:flex h-screen items-center justify-center hidden '>Currently Only for Mobile View</div>
        </div>
    )
}

export default App