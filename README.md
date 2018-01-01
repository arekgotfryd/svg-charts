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

* `npm run build` build
* open `index.html` and check console output it shows few simple tests results. 

# Examples

## Draw pie charts on google maps

* `cd examples\google-maps`
* `npm install`
* open index.html in your browser

## Just draw pie charts 
* `cd examples\just-pie-chart`
* `npm install`
* open index.html in your browser

# API

## generatePieChartSVG
Returns pie chart svg node
Params:
 @param {number[]} values
 @param {string[]} colors
 @param {number} radius
 @param {number} stroke
Usage examples in examples directory
