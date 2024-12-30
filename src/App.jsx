import { useEffect, useState } from 'react'
import Table from './components/Table'
import Statistics from './components/Statistics'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import { getCombinedData, initDatabase } from './services/api'

function App() {
  const [month, setMonth] = useState('select');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [initData, setInitData] = useState([]);

  useEffect(() => {
    initDatabase();
    const getCombined = async () => {
      const { data } = await getCombinedData({month});
      setInitData(data.transactions);
    }
    getCombined();
  }, [])

  console.log(initData);

  return (
    <div className="h-full w-full flex justify-center flex-col items-center mt-[50px] gap-3">
      <div className='h-[170px] w-[170px] bg-yellow-100 flex justify-center items-center rounded-full'>
        <h1 className='text-2xl font-bold'>Transaction<br /> Dashboard</h1>
      </div>

      <select value={month} onChange={(e) => {
        e.preventDefault();
        setMonth(e.target.value);
      }} className='w-[200px] h-8 border-solid border-2 rounded-md border-gray-700 pl-1'>
        <option value={'select'}>Select Month</option>
        {
          months.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))
        }
      </select>
      <Table month={month} initData={initData} />
      <div className='p-2 flex w-full justify-around items-center'>
        <Statistics month={month} initData={initData} />
        <PieChart month={month} initData={initData} />
      </div>
      <BarChart month={month} initData={initData} />
    </div>
  )
}

export default App
