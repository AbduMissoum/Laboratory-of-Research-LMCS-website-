import React, { useState } from 'react'
import { NavLink, Outlet } from "react-router-dom"
import Menu from './Menu/Menu.jsx'




export default function MLayout() {


  return (<div className=' bg-background fixed top-0 left-0 w-full h-full  z-0'>
    <Menu />
    <Outlet context={{
      UserValidation: {
        userInfo: { Role: 1 }
      },
      LandingPage: {
        news: [
          {
            title: 'title',
            paragraphe: 'import React, { useState } from react \n import { NavLink, Outlet } from "react-router-dom" \n import Menu from ./Menu/Menu.jsx',
            img: 'https://img.freepik.com/photos-gratuite/peinture-lac-montagne-montagne-arriere-plan_188544-9126.jpg',
            Subject: 'Best Publication'
          },
          {
            title: 'Not a title',
            paragraphe: 'imrgregt, { useState } from react \n ietghtyrthgLink, Outlet } from "react-router-dom" \n irgergegpojoj*zolmajn,vjaerkhga',
            img: 'https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg',
            Subject: 'Best Chercheur'
          }]
      }
    }} />
  </div>
  )
}