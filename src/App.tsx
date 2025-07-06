import '@/App.css'
import Sidebar from "@/features/Sidebar";
import Topbar from "@/features/Topbar";
import RefinePanel from "@/features/RefinePanel";
import ProfileCard from "@/features/ProfileCard";
import ProfileDetails from "@/features/ProfileDetails";
import NetworkVisualization from "./features/NetworkVisualization";

function App() {
  return (
    <div className="flex flex-row w-full gap-4 max-w-screen">
      <Sidebar/>
      <main className="flex-1">
        <Topbar/>
        <RefinePanel/>
        <h2 className="font-bold text-3xl my-4">PeerSpace</h2>
        <section className="flex flex-row gap-4">
          <div className="w-1/2">
            <ProfileCard/>
            <ProfileDetails/>
          </div>
          <div className="w-1/2 overflow-hidden">
            <NetworkVisualization
              // doctorId="0000-0003-0427-0369"
              doctorId="0000-0002-7034-5843"
              category="Researcher"
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
