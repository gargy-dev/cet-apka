import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Cet = lazy(() => import("./pages/Cet"));
const Prihlasenie = lazy(() => import("./pages/Prihlasenie"));
const Registracia = lazy(() => import("./pages/Registracia"));
const NastavAvatar = lazy(() => import("./pages/NastavAvatar"));
const NastavUzivatelskeMeno = lazy(() => import("./pages/NastavUzivatelskeMeno"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<></>}>
        <Routes>
          <Route path="/registracia" element={ <Registracia /> } />
          <Route path="/prihlasenie" element={ <Prihlasenie /> } />
          <Route path="/nastavit-avatar" element={ <NastavAvatar /> } />
          <Route path="/nastav-uzivatelske-meno" element={ <NastavUzivatelskeMeno /> } />
          <Route path="/" element={ <Cet /> } />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
