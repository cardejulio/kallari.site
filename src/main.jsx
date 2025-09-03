import React from 'react'
import { createRoot } from 'react-dom/client'
import KallariSite from './App.jsx'
import './style.css'
const el = document.getElementById('root')
const root = createRoot(el)
root.render(<KallariSite />)
