import React from 'react';
import './KanbanBoard.css';
import { KanbanBoardColumn } from './KanbanBoardColumn';
import { Card } from './Card';

type KanbanBoardProps = {
    title?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    data?: any[];
}

type KanbanBoardState = {
    draggingItem: [number, number];
    newposition: [number, number];
    data: any[];
}

export class KanbanBoard extends React.Component<KanbanBoardProps, KanbanBoardState> {
    constructor(props: KanbanBoardProps) {
        super(props);
        this.state = {
            draggingItem: [-1,-1],
            newposition: [-1, -1],
            data: this.props.data || [],
        };
    }

    deleteCard = (i:number, j:number) => () => {
        // delete jth card in ith column in data list
        const data = this.state.data;
        data[i].tasks.splice(j, 1);
        this.setState({data});
    }

    onDrop = (x:number) => (e:any) => {
        try{
            let i = this.state.draggingItem[0];
            let j = this.state.draggingItem[1];
            let y = this.state.newposition[1];
            const data = this.state.data;
            // if is dragging item is a card
            if (i >= 0 && j >= 0) {
                let draggingItem = data[i].tasks[j];
                // if new position is same as old position, do nothing
                if (i === x && j === y) {
                    return;
                }
                // if new position doesn't have a card append dragging item to end of column
                // if new position has a card but in different column, append dragging item before new position
                // if new position has a card and in same column, swap dragging item with new position
                if (y >= 0 && i === x) {
                    data[i].tasks[j] = data[i].tasks[y];
                    data[i].tasks[y] = draggingItem;
                } else {
                    data[i].tasks.splice(j, 1);
                    if (y >= 0 && i !== x) {
                        data[x].tasks.splice(y, 0, draggingItem);
                    } else {
                        data[x].tasks.push(draggingItem);
                    }
                }
            }
            this.setState({data, draggingItem: [-1,-1], newposition: [-1,-1]});
        } catch (e) {
            console.log(e);
        }
    }

    addColumn = () => () => {
        // append new column to end of data list
        const data = this.state.data;
        data.push({
            title: 'New Column',
            tasks: []
        });
        this.setState({data});
    }

    addCard = (i:number) => () => {
        // append new card to ith column in data list
        const data = this.state.data;
        data[i].tasks.push({
            title: 'New Task',
            description: 'Description'
        });
        this.setState({data});
    }

    render() {
        return (
            <div className='board'>
                <div className='board-title' contentEditable suppressContentEditableWarning={true}>
                    <h1>{this.props.title}</h1>
                </div>
                <div className='board-content'>
                    {this.state.data.map((column, i) => (
                        <KanbanBoardColumn
                            title={column.title}
                            key={i}
                            onDrop={this.onDrop(i)}
                        >
                        {column.tasks.map((task:any, j:number) => (
                            <Card
                                title={task.title}
                                key={j}
                                deleteCard={this.deleteCard(i,j)}
                                onDragEnter={() => {this.setState({newposition: [i,j]})}}
                                onDragStart={() => {this.setState({draggingItem: [i, j]})}}
                                isDragging={this.state.draggingItem[0] === i && this.state.draggingItem[1] === j}
                            >
                                {task.description}
                            </Card>
                        ))}
                            <Card function>
                                <div className='function-card'>
                                    <div className='add-btn' onClick={this.addCard(i)}>+</div>
                                    Add Card
                                </div>
                            </Card>
                        </KanbanBoardColumn>
                    ))}
                        <KanbanBoardColumn>
                            <Card function>
                                <div className='function-card'>
                                    <div className='add-btn' onClick={this.addColumn()}>+</div>
                                    Add Column
                                </div>
                            </Card>
                        </KanbanBoardColumn>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
