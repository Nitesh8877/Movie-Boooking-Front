import React from 'react'
import AppRoutes from './componets/routes/AppRoutes'
import {API_BASE_URL,TIMEOUT} from './Config/Config'
export default function App() {

  console.log(API_BASE_URL,TIMEOUT)
  return (
    <div style={{fontFamily:"cursive"}}>
      <AppRoutes/>
    </div>
  )
}
