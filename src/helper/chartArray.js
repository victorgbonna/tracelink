function transposeArray(item){
    const output=item[0].map((_,colIndex)=>item.map(row=>row[colIndex]))
    return output
}
export default function chartArray({candlesArray,showList, filterList}) {
    let yArr=[]
    let xArr=[]
    candlesArray.map((cItem)=>{
        xArr.push(cItem[0])
        let yArrArr=[]
        showList.map((sItem)=>{
            yArrArr.push(cItem[filterList.indexOf(sItem)+1])
        })
        yArr.push(yArrArr)
    })
    return [xArr,transposeArray(yArr)]
}