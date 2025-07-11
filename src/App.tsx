import {lazy, Suspense, useEffect, useState} from "react";

import Sidebar from "@/features/Sidebar";
import Topbar from "@/features/Topbar";
import RefinePanel from "@/features/RefinePanel";
import ProfileCard from "@/features/ProfileCard";
import NetworkVisualization from "@/features/NetworkVisualization";
import type {Item} from "@/features/SearchDropdown";
import {idParser} from "@/lib/utils";

import '@/App.css'

const NetworkVisualization = lazy(
  () => import('@/features/NetworkVisualization')
);

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
          // const parsed = idParser(data[0].id);
          // hardcoded for preview
          setSingleDoctorData({category: 'Researcher', doctorId: '0000-0003-0427-0369'});
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
          <div className="w-1/3 max-h-[70vh] overflow-y-scroll profile-scrollbar">
            <ProfileCard/>
          </div>
          <div className="w-2/3 max-h-[70vh] overflow-hidden">
            {doctorsList.length > 0 ? (
              <Suspense fallback={<div>Loading...</div>}>
                <NetworkVisualization
                  doctorId={singleDoctorData.doctorId}  // 0000-0002-7034-5843
                  category={singleDoctorData.category}
                  dataLoadWorker={dataLoadWorker}
                />
              </Suspense>
            ) : <div>Loading...</div>}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
