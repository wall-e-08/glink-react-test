import {useEffect, useMemo, useState} from "react";
import '@/App.css'
import Sidebar from "@/features/Sidebar";
import Topbar from "@/features/Topbar";
import RefinePanel from "@/features/RefinePanel";
import ProfileCard from "@/features/ProfileCard";
import ProfileDetails from "@/features/ProfileDetails";
import NetworkVisualization from "@/features/NetworkVisualization";
import {idParser} from "./lib/utils";

const dataLoadWorker = new Worker(
  new URL('@/workers/dataLoad.worker.ts', import.meta.url),
  {type: 'module'}
);

function App() {
  const [doctorsList, setDoctorsList] = useState<any[]>([]);

  useEffect(() => {
    dataLoadWorker.onmessage = e => {
      const { success, data, error, dataType } = e.data;

      if (dataType !== 'DOCTORS_LIST') {
        return;
      }

      if (success) {
        setDoctorsList(data)
        console.log("doctorsList", data);
      } else {
        console.error('Error loading GraphML:', error);
      }
    };

    dataLoadWorker.postMessage({
      dataType: 'DOCTORS_LIST'
    });
  }, []);

  const singleDoctorData = useMemo(() => {
    if (doctorsList.length > 0) {
      return idParser(doctorsList[0].id);
    }
    return {
      doctorId: '',
      category: ''
    }
  }, [doctorsList])

  return (
    <div className="flex flex-row w-full gap-4 max-w-screen">
      <Sidebar/>
      <main className="flex-1">
        <Topbar/>
        <RefinePanel doctorsList={doctorsList}/>
        <h2 className="font-bold text-3xl my-4">PeerSpace</h2>
        <section className="flex flex-row gap-4">
          <div className="w-1/2">
            <ProfileCard/>
            <ProfileDetails/>
          </div>
          <div className="w-1/2 overflow-hidden">
            <NetworkVisualization
              doctorId={singleDoctorData.doctorId}
              category={singleDoctorData.category}
              dataLoadWorker={dataLoadWorker}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
