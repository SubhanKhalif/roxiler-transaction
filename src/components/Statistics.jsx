import React, { useEffect, useState } from 'react'
import { getStatistics } from '../services/api';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getStatistics({ month });
      setStatistics(data);
    };
    fetchData();
  }, [month]);


  return (
    <div className='mb-10 w-50'>
      <h3 className='text-[20px]'>Statistics - <strong>{month}</strong><span className='text-[10px] align-top'>(selected month from the dropdown)</span></h3>
      <div className='h-auto w-60 bg-yellow-200 rounded-xl p-3 border-none leading-8'>
        <p>Total sale : {statistics?.totalSaleAmount}</p>
        <p>Total sold items : {statistics?.totalSoldItems}</p>
        <p>Total not sold items : {statistics?.totalNotSoldItems}</p>
      </div>
    </div>
  )
}

export default Statistics