import React from "react";
import { Board } from "./Board";
import { isNotBlack } from "../utils/SuccessUtil";
import isFinishGame from "../utils/SuccessUtil";

export class Game extends React.Component {

    //------------------------ react 生命周期方法 --------------------

    // 构造函数
    constructor(props){
        super(props)
        this.state = {
            row: 3,
            column: 3,
            result: null, // 定义二维数字
            xIsNext: true, // X先下
            showError: false, // 显示异常信息
            xSept: [], // 记录X每次下的坐标
            oSept: [], // // 记录O每次下的坐标
            playGameResultTip: ''
        }
    }

    componentWillMount() {
        let row = this.state.row
        let column = this.state.column
        // 定义n行n列的二维数组
        let result = this.initArray(row, column)
        this.setState({
            result : Object.assign([], result)
        })
    }

    render() {
        return (
            <div>
                {/* 行数*/}
                <div>
                    <span className="game_span">行数</span>
                    <input
                        className= "game_input"
                        value={this.state.row}
                        onChange={(event) =>this.handleChange(event,'row')}/>
                </div>
                {/* 列数*/}
                <div>
                    <span className="game_span">列数</span>
                    <input
                        className= "game_input"
                        value={this.state.column}
                        onChange={(event) =>this.handleChange(event,'column')}/>
                    { (this.state.xSept.length > 0 || this.state.oSept.length > 0) ? <button className= "lc_button" onClick={() =>this.playAgain()}>重新开始</button> : null }
                </div>

                { this.state.showError ? this.errorTip() : null }
                { this.state.playGameResultTip ? this.playGameResultTip() : null }

                {/*游戏内容*/}
                <div className="game">
                    <div className="game-board">
                        <Board
                            result={this.state.result}
                            onClick={ (row,column) => this.playGame(row,column)}
                        />
                    </div>
                    <div className="game-info">
                    </div>
                </div>
            </div>
        );
    }

    errorTip() {
        return (
            <div className="error_tip">
                <span>输入的行数和列数不相等！！</span>
            </div>
        )
    }

    playGameResultTip() {
        return (
            <div className="error_tip">
                <span>{ this.state.playGameResultTip }</span>
            </div>
        )
    }

    // ---------------------------------- 方法-----------------------

    // 输入框值改变事件
    handleChange(e, params) {
        let value = e.target.value
        let rowParam = this.state.row
        let columnParam = this.state.column
        let showError = false
        // 判断当前用户改变数值的输入框是行还是列
        if (params === 'row'){
            rowParam = value
        } else {
            columnParam = value
        }

        // 行数和列数必须相等！
        if (parseInt(rowParam) != parseInt(columnParam)) {
            showError = true
        }

        let status = {
            row: rowParam,
            column: columnParam,
            showError: showError
        }

        if (isNotBlack(rowParam) && isNotBlack(columnParam) && !showError){
            let result = this.initArray(rowParam, columnParam)
            status.result = Object.assign([], result)
        }
        this.setState(status)
    }

    // 点击事件
    playGame(row, column){
        let result = Object.assign([], this.state.result)
        if (result[row][column] || isNotBlack(this.state.playGameResultTip)) {
            return
        }
        result[row][column] = this.state.xIsNext ? "X":"O"

        let xSept = Object.assign([], this.state.xSept)
        let oSept = Object.assign([], this.state.oSept)

        // 根据当前下棋是X或O，来记录对应的坐标
        if (this.state.xIsNext) {
            xSept.push({row: row, column: column})
        }else {
            oSept.push({row: row, column: column})
        }

        let playGameResult = isFinishGame(xSept,oSept,this.state.row )
        let playGameResultTip = ''
        if (playGameResult === 'X') {
            playGameResultTip = '恭喜X获得胜利！！'
        } else if (playGameResult === 'O') {
            playGameResultTip = '恭喜O获得胜利！！'
        }

        this.setState({
            result: result,
            xIsNext: !this.state.xIsNext,
            xSept: xSept,
            oSept: oSept,
            playGameResultTip: playGameResultTip
        })
    }

    playAgain() {

        let row = this.state.row
        let column = this.state.column
        // 定义n行n列的二维数组
        let result = this.initArray(row, column)

        this.setState({
            result : Object.assign([], result),
            xIsNext: true, // X先下
            showError: false, // 显示异常信息
            xSept: new Array(), // 记录X每次下的坐标
            oSept: new Array(), // // 记录O每次下的坐标
            playGameResultTip: ''
        })
    }

     // 定义n行n列的二维数组
    initArray(row, column) {
        let rowParam = parseInt(row)
        let columnParam = parseInt(column)
        // 先定义一维数字
        let result = new Array(rowParam).fill(null)
        // 再定义二维数字
        for (let rowIndex = 0; rowIndex < result.length; rowIndex++ ) {
            result[rowIndex] = new Array(columnParam).fill(null)
        }
        return result
    }

}
