import SVG from 'svg.js';

function areValuesNegative(values) {
    return values.some(v => v <= 0);
}

function areColorsInvalid(colors) {
    let testDiv = document.createElement("div");
    testDiv.setAttribute("style", "background-color: white;")
    for (let index = 0; index < colors.length; index++) {
        testDiv.setAttribute("style", `background-color: ${colors[index]};`)
        if (testDiv.style.backgroundColor != 'rgb(255, 255, 255)' || colors[index] == 'white' || colors[index] == '#fff' || colors[index] == '#ffff' || colors[index] == '#fffff') {
            testDiv.setAttribute("style", "background-color: white;")
        } else {
            return true;
        }
    }
    return false;

}

function validateInputs(values, colors, radius, strokeSize, strokeColor) {
    if (values.length != colors.length) {
        throw new Error("Values array length differs from colors array length");
    } else if (areValuesNegative(values)) {
        throw new Error("Values array must only includes positive values");
    } else if (areColorsInvalid(colors)) {
        throw new Error("Please be sure that you entered correct color values into colors input array");
    } else if (areColorsInvalid([strokeColor])) {
        throw new Error("Please be sure that you entered correct color value for stroke");
    } else if (radius <= 0) {
        throw new Error("Please be sure that radius is positive value")
    } else if (strokeSize < 0) {
        throw new Error("Please be sure that strokeSize is greater or equal zero value")
    }
}

function getPointsAndAnglesOnPerimeter(pointAngleInDegrees, radius) {
    var pointAngleInRadians = pointAngleInDegrees * (Math.PI / 180);
    var x = Math.cos(pointAngleInRadians) * radius;
    var y = Math.sin(pointAngleInRadians) * radius;
    return [x, y, pointAngleInDegrees];
}

function pointAngleInDegrees(value, sum) { return Math.floor((value / sum).toFixed(2) * 360); }

function draw(adjustedPointsAndAnglesOnPerimeter, radius, strokeSize, colors, strokeColor) {
    let radiusPlusStroke = radius + strokeSize;
    var div = document.createElement("div");
    var draw = SVG(div).size(2 * radiusPlusStroke, 2 * radiusPlusStroke);
    var circle = draw.circle(2 * radiusPlusStroke).fill(strokeColor);
    adjustedPointsAndAnglesOnPerimeter.forEach((xy, i, array) => {
        if (i == 0) {
            if (xy[2] > 180) {
                draw.path(`M${array[array.length - 1][0]} ${array[array.length - 1][1]} A ${radius} ${radius}, 0, 1, 1, ${xy[0]} ${xy[1]} L ${radiusPlusStroke} ${radiusPlusStroke} Z`).fill(colors[i]);
            } else {
                draw.path(`M${array[array.length - 1][0]} ${array[array.length - 1][1]} A ${radius} ${radius}, 0, 0, 1, ${xy[0]} ${xy[1]} L ${radiusPlusStroke} ${radiusPlusStroke} Z`).fill(colors[i]);
            }
        } else {
            if (array[i][2] - array[i - 1][2] > 180) {
                draw.path(`M${array[i - 1][0]} ${array[i - 1][1]} A ${radius} ${radius}, 0, 1, 1, ${xy[0]} ${xy[1]} L ${radiusPlusStroke} ${radiusPlusStroke} Z`).fill(colors[i]);
            } else {
                draw.path(`M${array[i - 1][0]} ${array[i - 1][1]} A ${radius} ${radius}, 0, 0, 1, ${xy[0]} ${xy[1]} L ${radiusPlusStroke} ${radiusPlusStroke} Z`).fill(colors[i]);
            }
        }
    });
    return draw.node.outerHTML;
}

function generatePointsAndAnglesOnCirclePerimeter(values, colors, radius, strokeSize) {
    let sum = values.reduce((previousValue, currentValue) => { return previousValue + currentValue });
    //I generate array with sum of values from 0 to i on each i position/index
    let summarizedValues = [];
    values.reduce(function (previousValue, currentValue, index) {
        summarizedValues.push(previousValue);
        if (index == (values.length - 1)) {
            summarizedValues.push(currentValue + previousValue);
        }
        return previousValue + currentValue;
    });
    let anglesInDegrees = summarizedValues.map((val) => { return (pointAngleInDegrees(val, sum)) })
    let pointsAndAnglesOnPerimeter = anglesInDegrees.map((angleInDegree) => getPointsAndAnglesOnPerimeter(angleInDegree, radius))
    let radiusPlusStroke = radius + strokeSize;
    let adjustedPointsAndAnglesOnPerimeter = pointsAndAnglesOnPerimeter.map((xy) => { return [xy[0] + radiusPlusStroke, xy[1] + radiusPlusStroke, xy[2]] })

    return adjustedPointsAndAnglesOnPerimeter;
}

/**
 * Adds commas to a number
 * @param {number[]} values
 * @param {string[]} colors
 * @param {number} radius
 * @param {number} [strokeSize=0]
 * @param {string} [strokeColor="white"]
 */
function generatePieChartSVG(values, colors, radius, strokeSize = 0, strokeColor = 'white') {
    try {
        validateInputs(values, colors, radius, strokeSize, strokeColor);
    } catch (error) {
        console.error(error.message)
        return;
    }

    let adjustedPointsAndAnglesOnPerimeter = generatePointsAndAnglesOnCirclePerimeter(values, colors, radius, strokeSize);
    return draw(adjustedPointsAndAnglesOnPerimeter, radius, strokeSize, colors, strokeColor);
}


module.exports = svgCharts
function svgCharts() {
    // API/data for end-user
    return {
        generatePieChartSVG: generatePieChartSVG
    }

}



