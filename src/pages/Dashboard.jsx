import { Card } from "@mui/material";
import { Layout } from "../components";
import { Icon } from "@iconify/react";
import { useEffect, useMemo, useState } from "react";
import { getLocalFoodData } from "../services";

const Dashboard = () => {
    const [data,setData] = useState([]);

    useEffect(()=>{
        getData();
    },[])

    const getData=()=>{
        getLocalFoodData().then((data)=>{
            console.log(data,'data');
            setData(data)
            
        }).catch((error)=>{
            console.log('Error while getting data');
            
        })
    }
    const isCreatedToday = (createdAt) => {
        const createdDate = new Date(createdAt);
        const today = new Date();
      
        return (
          createdDate.getDate() === today.getDate() &&
          createdDate.getMonth() === today.getMonth() &&
          createdDate.getFullYear() === today.getFullYear()
        );
      };

    const getTotalCount=useMemo(()=>data?.length,[data])
    const getRecentAddedCount=useMemo(()=>data?.filter((data)=>isCreatedToday(data?.createdAt))?.length,[data])
    const getLowStockCount=useMemo(()=>data?.filter((data)=>data?.servings<5)?.length,[data])
  return (
    <Layout heading="Dashboard">
    <Card className="h-screen p-5">
      <div className=" flex justify-between items-center gap-2 ">
        <div className="rounded border border-orange-500 w-4/12 h-[200px] items-center flex p-5">
          <div className="bg-orange-500 rounded-full p-2 w-20 h-20 flex justify-center items-center"
          >
            <Icon
              icon="mdi:chart-line"
              color="white"
              width={30}
                          />
          </div>
          <div className="ms-5">
            <h2 className="text-2xl font-bold">Total Items</h2>
            <p className="text-lg font-bold text-gray-500">{getTotalCount}</p>
          </div>
        </div>
        <div className="rounded border border-orange-500 w-4/12 h-[200px] items-center flex p-5">
          <div className="bg-orange-500 rounded-full p-2 w-20 h-20 flex justify-center items-center"
          >
            <Icon
              icon="mdi:chart-line"
              color="white"
              width={30}
                          />
          </div>
          <div className="ms-5">
            <h2 className="text-2xl font-bold">Recently added Items</h2>
            <p className="text-lg font-bold text-gray-500">{getRecentAddedCount}</p>
          </div>
        </div>
        <div className="rounded border border-orange-500 w-4/12 h-[200px] items-center flex p-5">
          <div className="bg-orange-500 rounded-full p-2 w-20 h-20 flex justify-center items-center"
          >
            <Icon
              icon="mdi:chart-line"
              color="white"
              width={30}
                          />
          </div>
          <div className="ms-5">
            <h2 className="text-2xl font-bold">Low stock Items</h2>
            <p className="text-lg font-bold text-gray-500">{getLowStockCount}</p>
          </div>
        </div>
      
      </div>
      </Card>
    </Layout>
  );
};

export default Dashboard;
