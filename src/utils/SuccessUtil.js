/**
 * 游戏是否结束，
 * @returns Object,结束则返回胜利的一方
 */
export default function isFinishGame(xSept, oSept,borderLength) {

    if (!borderLength || isNaN(borderLength)) {
        return null
    }

    let xTarget = createDataStructure(xSept)
    let xRowArray = xTarget.row
    let xColumnArray = xTarget.column
    // 查看x的对角线是否满足获胜条件
    let xDiagonalFlag= diagonal(xRowArray,parseInt(borderLength))

    let oTarget = createDataStructure(oSept)
    let oRowArray = oTarget.row
    let oColumnArray = oTarget.column
    // 查看o的对角线是否满足获胜条件
    let oDiagonalFlag= diagonal(oRowArray,parseInt(borderLength))

    let xResult = finishResult(xRowArray,xColumnArray,borderLength )
    let oResult = finishResult(oRowArray,oColumnArray,borderLength )

    if (xResult || xDiagonalFlag) {
        return 'X'
    } else if (oResult || oDiagonalFlag) {
        return 'O'
    } else {
        return null
    }
}

/**
 * 创建行的数据结构
 * 如 [
 *          [1,2.3,4],
 *          [5,6,7,8]
 *          [9,10,11,12]
 *    ]
 *    代表的含义： 第0行第0列为 1
 * @param dataResource 传入的数据源，格式为： [{ row: 0, column: 2}]
 * @param isRow 判断是否已行的形式显示二维数组，否则为列显示二维数组
 * @returns {Object} 返回一个行和列的对象如 ｛ row： [], column: []｝
 */
function createDataStructure(dataResource) {

    let targetRowData = new Array() //构造出来的数据结构
    let targetColumnData = new Array() //构造出来的数据结构
    dataResource.forEach(sept => {
        createArray(targetRowData, sept.row, sept.column)
        createArray(targetColumnData, sept.column, sept.row)
    })
    let result = { row: targetRowData , column: targetColumnData}
    return result
}

/**
 * 创建一维数组
 * @param targetData 需要存入的一维数组
 * @param rowIndex 需要存入的索引
 * @param pushValue 存入的值
 */
function createArray(targetData,rowIndex, pushValue) {

    let result = null
    if (targetData[rowIndex]){
        result = targetData[rowIndex]
    } else {
        result = new Array()
    }
    result.push(pushValue)
    targetData[rowIndex] = result
}

/**
 * 查看是否结束
 * @param row
 * @param column
 * @param borderLength
 * @returns {boolean}
 */
function finishResult(row, column, borderLength) {
    let rowFlag = isFinish(row,parseInt(borderLength)) // 行数据是否满足获胜条件
    let columnFlag = isFinish(column,parseInt(borderLength)) // 列数据是否满足获胜条件
    if (rowFlag || columnFlag) {
        return true
    } else {
        return false
    }
}

/**
 *  查看是否满足获胜条件
 * @param row
 * @param borderLength
 * @returns {boolean}
 */
function isFinish(row, borderLength) {
    for (let index = 0; index < row.length; index++) {
        if (row[index] && row[index].length > 0){
            if (row[index].length === borderLength) {
                return true
            }
        }
    }
    return false
}


function diagonal(targetResource, borderLength) {
    if (targetResource && targetResource.length > 0) {
        let clockwiseDiagonal = [] // 顺时针对角线
        let anticlockwiseDiagonal = [] // 逆时针对角线
        for (let index = 0; index < borderLength; index++) {
            let rowResource = targetResource[index]
            if (rowResource && rowResource.length > 0) {

                for (let column = 0; column < rowResource.length; column++ ) {
                    let Y = rowResource[column]
                    // 即满足对角线（从左上角到右下角）的坐标， 如：3x3 的矩阵中 （0，0）（1，1）（2，2）等情况。
                    if (Y === index){
                        clockwiseDiagonal.push({row: index, column: Y})
                    }
                    // 即满足对角线（从左下角到右上角）的坐标， 如：3x3 的矩阵中（0，2）（1，1）(2,0)等情况。
                    if (Y === borderLength - index - 1) {
                        anticlockwiseDiagonal.push({row: index, column: Y})
                    }
                }
            }
        }
        if (clockwiseDiagonal.length === borderLength
            || anticlockwiseDiagonal.length === borderLength) {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}








export function isNotBlack(val) {
    if (val) {
        if (val != null && val != undefined && val != '' && val.length != '') {
            return true
        } else {
            return false
        }
    } else {
        return false
    }
}
