import {Line} from 'react-chartjs-2';
import chartArray from '../helper/chartArray'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function LineChart({showList,candlesArray, filterList}) {
  const colors=['red','blue', 'yellow', 'black', 'green']
  const chartData= chartArray({candlesArray, showList, filterList})
  const defaultObj={
    label: 'My First dataset',
    fill: false,
    lineTension: 0.1,
    borderColor: 'rgba(75,192,192,1)',
    borderCapStyle: 'butt',
    borderDash: [],
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    pointBorderColor: 'rgba(75,192,192,1)',
    pointBackgroundColor: '#fff',
    pointBorderWidth: 1,
    pointHoverRadius: 5,
    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
    pointHoverBorderColor: 'rgba(220,220,220,1)',
    pointHoverBorderWidth: 2,
    pointRadius: 1,
    pointHitRadius: 10,
    data: [65, 59, 80, 81, 56, 55, 40]
  }
  console.log({filterList})
  const data = {
    labels:chartData[0],
    datasets:chartData[1].map((dataset,index)=>({
      ...defaultObj, label:showList[index], backgroundColor:colors[index],borderColor:colors[index], data:dataset
    }))
  }
  return (
    <div style={{border:'2px solid black'}}>
    <h2 style={{textAlign:'center', marginBottom:'10px'}}>OHLCV against timestamp</h2>
    <Line
      data={data}
      width={1100}
      height={800}
    />
  </div>
  )
}
