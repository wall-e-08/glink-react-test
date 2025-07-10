import {useEffect, useMemo, useState} from "react";
import '@/App.css'
import Sidebar from "@/features/Sidebar";
import Topbar from "@/features/Topbar";
import RefinePanel from "@/features/RefinePanel";
import ProfileCard from "@/features/ProfileCard";
import ProfileDetails from "@/features/ProfileDetails";
import NetworkVisualization from "@/features/NetworkVisualization";
import type {Item} from "@/features/SearchDropdown";
import {idParser} from "@/lib/utils";

const dataLoadWorker = new Worker(
  new URL('@/workers/dataLoad.worker.ts', import.meta.url),
  {type: 'module'}
);

// todo: use context or redux
function App() {
  const [doctorsList, setDoctorsList] = useState<Item[]>([]);
  const [singleDoctorData, setSingleDoctorData] = useState<{ doctorId: string; category: string }>({doctorId: '', category: ''});

  useEffect(() => {
    dataLoadWorker.onmessage = e => {
      const { success, data, error, dataType } = e.data;

      if (dataType !== 'DOCTORS_LIST') return;

      if (success) {
        if (data.length > 0) {
          setDoctorsList(data);
          console.log(App.name, '-> doctorsList =>', data);
          const parsed = idParser(data[0].id);
          setSingleDoctorData(parsed);
        } else {
          setDoctorsList([])
        }
      } else {
        console.error('Error loading GraphML:', error);
      }
    };

    dataLoadWorker.postMessage({ dataType: 'DOCTORS_LIST' });
  }, []);

  const onSelectDoctor = (item: Item) => {
    const parsed = idParser(item.id);
    setSingleDoctorData(parsed);
  };

  return (
    <div className="flex flex-row w-full gap-4 max-w-screen">
      <Sidebar/>
      <main className="flex-1">
        <Topbar/>
        <RefinePanel
          doctorsList={doctorsList}
          onSelect={onSelectDoctor}
        />
        <h2 className="font-bold text-3xl my-4">PeerSpace</h2>
        <section className="flex flex-row gap-4">
          <div className="w-1/2">
            <ProfileCard/>
            <ProfileDetails/>
          </div>
          <div className="w-1/2 overflow-hidden">
            {singleDoctorData.doctorId ? (
              <NetworkVisualization
                doctorId={singleDoctorData.doctorId}
                category={singleDoctorData.category}
                dataLoadWorker={dataLoadWorker}
              />
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
