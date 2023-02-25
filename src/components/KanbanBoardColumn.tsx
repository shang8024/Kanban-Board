import React, { MouseEventHandler } from "react";
import { Card } from "./Card";
import './KanbanBoard.css';

type KanbanBoardColumnProps = {
    title?: string;
    children?: React.ReactNode;
    onDrop?: MouseEventHandler;
}

type KanbanBoardColumnState = {
    isDragover: boolean;
}

export class KanbanBoardColumn extends React.Component<KanbanBoardColumnProps, KanbanBoardColumnState> {
    constructor(props: KanbanBoardColumnProps) {
        super(props);
        this.state = {
            isDragover: false,
        };
    }

    onDragOver = (e:any) => {
        e.preventDefault();
        this.setState({isDragover: true});
    }

    onDrop = (e:any) => {
        e.preventDefault();
        this.setState({isDragover: false});
        this.props.onDrop && this.props.onDrop(e);
    }

    render() {
        return (
            <div className={`board-column ${this.state.isDragover ? "dragover" : ''}`}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                onDragEnter={() => this.setState({isDragover: true})}
                onDragLeave={() => this.setState({isDragover: false})}
            >
                {this.props.title &&
                <div className='board-column-title' contentEditable suppressContentEditableWarning={true}>
                    <b>{this.props.title}</b>
                </div>}
                <div className='board-column-content'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}