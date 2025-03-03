import React from 'react'
import Card from '../../assets/images/expense.jpg';
import { LuTrendingUpDown } from 'react-icons/lu';	

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>
      <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12">
        <h2 className="text-lg font-medium text-black">Expense Tracking System</h2>
        {children}
      </div>

      <div className="hidden md:block w-[40vw] h-screen bg-slate-800 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative ">
        <div className="w-48 h-48 rounded-[40px] bg-slate-900 absolute -top-7 -left-5"/>
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-slate-700 absolute top-[30%] right-10"/>
        <div className="w-48 h-48 rounded-[40px] bg-slate-500 absolute -bottom-7 -left-5"/>
        
        <div className="grid grid-cols-1 z-20">
            <StatsInfoCard
                icon={<LuTrendingUpDown />}
                label="Track your Income and Expense"
                value="430,000"
                color="bg-slate-900"
            />
        </div>

        <img src={Card} className='w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-slate-300' alt="image" />

      </div>

    </div>
  )
}

export default AuthLayout


const StatsInfoCard = ({icon, label, value, color}) =>{
    return (
        <div className="flex gap-6 bg-slate-500 p-4 rounded-xl shadow-md shadow-slate-500/10 border border-gray-200/50 z-1">
            <div className={`w-12 h-12 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
                {icon}
            </div>
            <div>
                <h6 className="text-xs text-gray-50 mb-1">{label}</h6>
                <span className='text-[20px] text-white'>ETB {value}</span>
            </div>
        </div>
    )
}