import axios from 'axios'
import Head from 'next/head'
import LineChart from '../components/lineChart'
import {useState, useCallback } from 'react'

export default function Home({instruments, candlesdata}) {  
  const [isSending, setIsSending] = useState(false)
  const [candles, setCandles]=useState(candlesdata)
  const [instrument, setInstrument]=useState(instruments[0])
  const timeFrameoptions=[ 'minute', '2minute' , '3minute' , '5minute' , '10minute' , '15minute' , '30minute' , 'hour' , '2hour' , '4hour' , 'day']
  const [timeFrame, setTimeFrame]= useState(timeFrameoptions[5])
  const [dateFrom, setDateFrom]= useState('2022-02-23')
  const [dateTo, setDateTo]= useState('2022-03-06')
  const filterList=['Open','High', 'Low', 'Close','Volume','OI']
  const [showList, setShowList]=useState(['High','Low'])
  const sendRequest = useCallback(async () => {
    // don't send again while we are sending
    if (isSending) return
    setIsSending(true)
    // console.log({instrument,timeframe,dateTo,dateFrom})
    const res = await axios(`http://139.59.76.169:4002/api/candles?instrument=${instrument}&timeframe=${timeFrame}&from=${dateFrom}&to=${dateTo}`)
    const candlesdata= res.data.data
    setCandles(candlesdata)

    // once the request is sent, update state again
    setIsSending(false)
  }, [isSending]) // update the callback if the state changes
  console.log({showList})
  const toggleShow=(item)=>{
    // console.log({showList})
    // console.log(showList.includes(item))
    
    let newListIfInclude=showList.slice(0, showList.indexOf(item)).concat(showList.slice(showList.indexOf(item) + 1))
    // console.log({newListIfInclude})
    showList.includes(item)?setShowList(newListIfInclude):setShowList([...showList, item])
    
  }
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center', paddingTop:'50px', margin:'10px', border:'2px solid black', fontSize:'14px', rowGap:'20px'}}>
      {/* <Head>
        <title>Hello</title>
        <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
      </Head> */}
      <div style={{display:'flex',justifyContent:'space-between', columnGap:'20px'}}>
        <label htmlFor="inst">Instrument:
          <select defaultValue={instrument} onChange={(e)=>setInstrument(e.target.value)}>
            {instruments.map((instr,index)=>
              <option value={instr} key={index}>{instr}</option>
            )} 
            
          </select>
        </label>
        
        <label htmlFor="frame">Time frame:
          <select defaultValue={timeFrame} onChange={(e)=>setTimeFrame(e.target.value)}>
            {timeFrameoptions.map((timeOption,index)=>
              <option value={timeOption} key={index}>{timeOption}</option>
            )} 
          </select>
        </label>

        <label htmlFor="from">Date from:
          <input type="date" id="from" value={dateFrom} max={dateTo} onChange={(e)=>setDateFrom(e.target.value)}/> 
        </label>
        
        <label htmlFor="from">Date to:
        <input type="date" id="to" value={dateTo} min={dateFrom} onChange={(e)=>setDateTo(e.target.value)}/>
        </label>
        
        <button style={{color:'green', padding:'10px 20px'}} disabled={isSending} onClick={sendRequest}>Fetch</button>
      </div>
      <div style={{display:'flex', justifyContent:'space-between', columnGap:'20px'}}>
        {filterList.map((item,index)=>
          <label htmlFor="from" key={index}><input type="checkbox" defaultChecked={showList.includes(item)} onChange={()=>toggleShow(item)}/>{item}</label>
        )}
      </div>
      <div style={{marginBottom:'70px'}}>
        {candles.length>0 && showList.length>0?
          <LineChart filterList={filterList} showList={showList} candlesArray={candles}/>
          : <h2>No candles to show. <span style={{fontSize:'10px'}}>Change your fetch details or check a filter</span></h2>
        }
      </div>
    </div>
  )
}


export async function getServerSideProps() {
  const [instrumRes, candleRes] = await Promise.all([
    axios.get('http://139.59.76.169:4002/api/instruments'),
    axios.get('http://139.59.76.169:4002/api/candles?instrument=NSE:SBIN&timeframe=15minute&from=2022-02-23&to=2022-03-04')
  ]);
  const [instruments, candlesdata] =[
    instrumRes.data.data,
    candleRes.data.data
  ];
  // console.log({usersRes}, {tasksRes})
  return { props: { instruments, candlesdata } };
}