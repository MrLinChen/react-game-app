import React from "react";
import {Square} from "./Square";

export class Board extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            columnIndex: 0
        }
    }

    createdTable(columnIndex,index, value) {
        return (
            <Square
                key={columnIndex}
                row={index}
                column={columnIndex}
                value={value}
                onClick={() => this.props.onClick(index,columnIndex )}
            />
        )
    }

    render() {
        return (
            <div>
                {
                    this.props.result.map((row, index) => {
                        return (
                            <div className="board-row" key={"row_" + index}>
                                { row.map((columnValue, columnIndex) => {
                                    return(
                                        this.createdTable(columnIndex,index, columnValue)
                                    )
                                })
                                }
                            </div>
                        )
                    })
                }
            </div>
        );
    }

}


