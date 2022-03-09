# Tracelink
#### This is a line chart showing trends against timestamp, collecting the data from an API.

## About The Project
#### Frameworks, tools and libraries used 
- React(Next Js) - Javascript frontend framework.
- chart/ react chart js- frontend library for plotting charts.

### Getting started 
#### To get a local copy up and running follow these simple example steps
#### Installation

- Clone the repo
- npm install
- 
### Map 
###### This would entail every file/components and it's uses
- Index.js- This contains every element except the container holding the chart plot.
- component/lineChart.js- This holds the chart plot.
- helper/chartArrayjs- This would convert the data gotten from an array in a way it can be parsed for plotting

### Special variable and functions used
#### Variables
- candles- holds the data gotten from the api endpoint with the request query. By default, it holds the data from http://139.59.76.169:4002/api/candles?instrument=NSE:SBIN&timeframe=15minute&from=2022-02-23&to=2022-03-04
- instrument- holds the data gotten from the api endpoint with the request query. By default, it holds the first element in the array response
- isSending- This should disable the fetch button when it is clicked, enables it after data has been gotten.
- timeFrame, dateFrom, dateTo- holds the data for the request query.
- filterList- holds all the list for the filter checkboxes.
- showList- holds the filtered list to show on the graph

#### Functions
- getServerSideprops- gets the candle and instrument data on the components initial rendering.
- sendRequest- sends request to update the candle data and just re-render the chart js file without altering other components (using the callback hook). 
- chartArray- creates 2 arrays from the candle api data, first one is an array to hold the timestamps values while the second one transposes the array of array for the filtered checkboxes.
- transposeArray- transposes the array passed as an argument.

### Contact 
- Email- victorgbonna@gmail.com
- Whatsapp - +234 8102603301
- Linkedln - [https://www.linkedin.com/in/victor-ogbonna-5a3113230](https://www.linkedin.com/in/victor-ogbonna-5a3113230)
-  Project Link: [https://github.com/victorgbonna/tracelink](https://github.com/victorgbonna/tracelink)
-  Site Link: [https://homejamm.herokuapp.com/]([https://homejamm.herokuapp.com/])

