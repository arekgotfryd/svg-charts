# svg-charts

Library that gives you possibility to draw pie charts in svg.

## Installation via npm

* Install  [node](https://nodejs.org)
* run `npm install svg-charts`

## Installation from repo

* Clone repo `git clone https://github.com/arekgofi/svg-charts.git`
* Install  [node](https://nodejs.org)
* run `npm install`

## Usage

* import  
`import svgCharts from 'svg-charts`  
`var svgc = svgCharts()`  
`svgc.generatePieChartSVG(values,colors,radius,strokeSize,strokeColor);`  

* script  
`<script src="build/index.js"></script>`  
`var svgc = svgCharts()`  
`svgc.generatePieChartSVG(values,colors,radius,strokeSize,strokeColor);`  

# Examples

## Draw pie charts on google maps

* `cd examples\google-maps`
* open index.html in your browser

## Just draw pie charts 
* `cd examples\just-pie-chart`
* open index.html in your browser

# API

## generatePieChartSVG
Returns pie chart svg node  
Params:  
 @param {number[]} values  
 @param {string[]} colors  
 @param {number} radius  
 @param {number} [strokeSize=0]  
 @param {string} [strokeColor="white"]  
