import React, { useEffect, useState } from 'react'
import { getTransactions } from '../services/api';

const Table = ({ month, initData }) => {
    const [transactions, setTransactions] = useState(initData);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const perPage = 10;

    const fetchData = async () => {
        const response = await getTransactions({ month, search, page, perPage });
        const data = await response.data;
        setTransactions(data.transactions);
        setPage(data.page)
    }

    useEffect(() => {
        fetchData();
    }, [month, search, page, perPage]);


    console.log(transactions);
    return (
        <div className='h-full w-full flex justify-center flex-col items-center gap-1'>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search transactions"
                className='w-[200px] h-8 border-solid border-2 rounded-md border-gray-700 pl-2'
            />
            <table className='text-sm text-center text-gray-900 table-fixed h-[70%] w-[90%]'>
                <thead className='border-2 p-2 border-solid border-gray-500 text-md text-gray-700 uppercase'>
                    <tr>
                        <th className='px-6 py-3 border-r-2 border-gray-300'>Title</th>
                        <th className='px-6 py-3 border-r-2 border-gray-300'>Description</th>
                        <th className='px-6 py-3 border-r-2 border-gray-300'>Price</th>
                        <th className='px-6 py-3 border-r-2 border-gray-300'>Date of Sale</th>
                        <th className='px-6 py-3 border-r-2 border-gray-300'>Category</th>
                        <th className='px-6 py-3'>Sold</th>
                    </tr>
                </thead>
                <tbody className='border-2 p-2 border-solid border-gray-500 text-md text-gray-700 uppercase'>
                    {transactions.map((transaction) => (
                        <tr key={transaction?._id} className='border-gray-500 border-b-2'>
                            <td className='px-6 py-3 border-r-2 border-gray-300'>{transaction?.title}</td>
                            <td className='px-6 py-3 border-r-2 border-gray-300 text-clip overflow-hidden'>{transaction?.description}</td>
                            <td className='px-6 py-3 border-r-2 border-gray-300'>{transaction?.price}</td>
                            <td className='px-6 py-3 border-r-2 border-gray-300'>{new Date(transaction?.dateOfSale).toLocaleDateString()}</td>
                            <td className='px-6 py-3 border-r-2 border-gray-300'>{transaction?.category}</td>
                            <td className='px-6 py-3'>{transaction?.sold ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex gap-4'>
                <button onClick={() => setPage(prev => prev - 1)} disabled={page === 1} className='border-solid border-1 bg-yellow-800 text-white p-2 w-[100px] rounded-md disabled:bg-slate-400'>Previous</button>
                <div className='border-solid border-1 bg-yellow-400 p-2 w-10 text-center rounded-md font-semibold'>{page}</div>
                <button onClick={() => setPage(prev => prev + 1)} disabled={page === 6} className='border-solid border-1 bg-yellow-800 text-white p-2 w-[100px] rounded-md disabled:bg-slate-400'>Next</button>
            </div>
        </div>
    )
}

export default Table