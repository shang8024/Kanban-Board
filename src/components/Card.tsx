import React, { MouseEventHandler } from "react";

type CardProps = {
    title?: string;
    children?: React.ReactNode;
    deleteCard?: MouseEventHandler;
    function?: boolean;
    onDragStart?: MouseEventHandler;
    onDragEnter?: MouseEventHandler;
    isDragging?: boolean;
}

type CardState = {
    isDragover: boolean;
}

export class Card extends React.Component<CardProps, CardState> {
    constructor(props: CardProps) {
        super(props);
        this.state = {
            isDragover: false,
        };
    }

    onDragOver = (e:any) => {
        e.preventDefault();
        if (!this.props.function && !this.props.isDragging) {
            this.setState({isDragover: true});
        }
    }

    onDragEnter = (e:any) => {
        e.preventDefault();
        if (!this.props.function && !this.props.isDragging) {
            this.setState({isDragover: true});
        }
        this.props.onDragEnter && this.props.onDragEnter(e);
    }

    render() {
        return (
            <div className={`card ${this.state.isDragover && !this.props.function ? "dragover" : ""}`}
                draggable={!this.props.function}
                onDragStart={this.props.onDragStart}
                onDragEnter={this.onDragEnter}
                onDragOver={this.onDragOver}
                onDragLeave={() => this.setState({isDragover: false})}
                onDrop={() => this.setState({isDragover: false})}
            >
                {this.props.title && 
                <div className='card-title'>
                    <div contentEditable suppressContentEditableWarning={true}><b>{this.props.title}</b></div>
                    <div className="dlt-btn" onClick={this.props.deleteCard}>x</div>
                </div>}
                <div className="card-content" contentEditable={!this.props.function} suppressContentEditableWarning={true}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}