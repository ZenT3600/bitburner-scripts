export function plot(series, cfg = undefined) {
    // this function takes both one array and array of arrays
    // if an array of numbers is passed it is transformed to
    // an array of exactly one array with numbers
    if (typeof(series[0]) == "number"){
        series = [series]
    }

    cfg = (typeof cfg !== 'undefined') ? cfg : {}

    let min = series[0][0]
    let max = series[0][0]

    for (let j = 0; j < series.length; j++) {
        for (let i = 0; i < series[j].length; i++) {
            min = Math.min(min, series[j][i])
            max = Math.max(max, series[j][i])
        }
    }
    
    // var largest = Math.max(series);
    const formatNums = Intl.NumberFormat('en-US', {
      notation: "compact",
      maximumFractionDigits: 3
    })
    let defaultSymbols = [ '┼', '┤', '╶', '╴', '─', '┗', '┏', '┓', '┛', '┃' ]
    let range   = Math.abs (max - min)
    let offset  = 3
    let padding = " ".repeat(10)
    let height  = 17
    let colors  = []
    let ratio   = range !== 0 ? height / range : 1;
    let min2    = Math.round (min * ratio)
    let max2    = Math.round (max * ratio)
    let rows    = Math.abs (max2 - min2)
    let width = 0
    for (let i = 0; i < series.length; i++) {
        width = Math.max(width, series[i].length)
    }
    width = width + offset
    let symbols = defaultSymbols
    let format  = function (x) {
        return (padding + formatNums.format(x)).slice (-padding.length)
    }

    let result = new Array (rows + 1) // empty space
    for (let i = 0; i <= rows; i++) {
        result[i] = new Array (width)
        for (let j = 0; j < width; j++) {
            result[i][j] = ' '
        }
    }
    for (let y = min2; y <= max2; ++y) { // axis + labels
        let label = format (rows > 0 ? max - (y - min2) * range / rows : y, y - min2)
        result[y - min2][Math.max (offset - label.length, 0)] = label
        result[y - min2][offset - 1] = (y == 0) ? symbols[0] : symbols[1]
    }

    for (let j = 0; j < series.length; j++) {
        let currentColor = colors[j % colors.length]
        let y0 = Math.round (series[j][0] * ratio) - min2
        result[rows - y0][offset - 1] = symbols[0] // first value

        for (let x = 0; x < series[j].length - 1; x++) { // plot the line
            let y0 = Math.round (series[j][x + 0] * ratio) - min2
            let y1 = Math.round (series[j][x + 1] * ratio) - min2
            if (y0 == y1) {
                result[rows - y0][x + offset] = symbols[4]
            } else {
                result[rows - y1][x + offset] = (y0 > y1) ? symbols[5] : symbols[6]
                result[rows - y0][x + offset] = (y0 > y1) ? symbols[7] : symbols[8]
                let fro = Math.min (y0, y1)
                let to = Math.max (y0, y1)
                for (let y = fro + 1; y < to; y++) {
                    result[rows - y][x + offset] = symbols[9]
                }
            }
        }
    }
    return result.map (function (x) { return x.join ('') }).join ('\n')
}
