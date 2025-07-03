import { useState } from 'react'
import '@/App.css'
import {Button} from "@/components/button";
import Sidebar from "@/features/Sidebar";
import Topbar from "@/features/Topbar";
import RefinePanel from "@/features/RefinePanel";
import ProfileCard from "@/features/ProfileCard";
import ProfileDetails from "@/features/ProfileDetails";
import NetworkPanel from "@/features/NetworkPanel";

function App() {
  return (
    <div className="flex flex-row w-fit">
      <Sidebar/>
      <main>
        <Topbar/>
        <RefinePanel/>
        <h2>PeerSpace</h2>
        <section>
          <div>
            <ProfileCard/>
            <ProfileDetails/>
          </div>
          <div>
            <NetworkPanel/>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
