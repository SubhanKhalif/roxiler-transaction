import React, { useEffect, useState } from 'react'
import { getBarChart } from '../services/api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const BarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getBarChart({ month });
      setBarChartData(data);
    };
    fetchData();
  }, [month]);

  const data = {
    labels: ['0-100', '101-200', '201-300', '301-400', '401-500', '501-600', '601-700', '701-800', '801-900', '901-above'],
    datasets: [
      {
        label: 'Number of Items',
        data: barChartData.map(item => item.count),
        backgroundColor: 'rgba(254,240,138,1)',
        borderColor: 'rgb(254,240,138)',
      },
    ],
  };

  return <div className='w-full h-[400px] p-2 flex flex-col justify-center items-center mt-2 mb-8'>
    <h3 className='text-[20px]'>Statistics - <strong>{month}</strong><span className='text-[10px] align-top'>(selected month from the dropdown)</span></h3>
    <Bar data={data} />
  </div>
}

export default BarChart