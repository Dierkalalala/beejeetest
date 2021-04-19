import React, {FormEvent} from "react";
import {TaskEditing} from "../../types/types";

type TaskProps = {
    id: number
    username: string,
    email: string,
    status: 0 | 1 | 10 | 11,
    text: string,
    editTask: (id: number, editTask: TaskEditing) => void;
    token: string
}

class AdminTask extends React.Component<TaskProps> {


    state = {
        id: this.props.id,
        text: this.props.text,
        status: this.props.status
    }


    updateStatus = async () => {
        if (this.state.status === 0) {
            await this.setState({status: 10});
            this.props.editTask(this.state.id, {status: 10, token: this.props.token})
            return;
        }
        if (this.state.status === 10) {
            await this.setState({status: 0});
            this.props.editTask(this.state.id, {status: 0, token: this.props.token})
            return;
        }
        if (this.state.status === 1) {
            await this.setState({status: 11});
            this.props.editTask(this.state.id, {status: 11, token: this.props.token})
            return;
        }
        if (this.state.status === 11) {
            await this.setState({status: 1});
            this.props.editTask(this.state.id, {status: 1, token: this.props.token})
            return;
        }
    }

    onTextChange = (e: FormEvent) => {
        let value = (e.target as HTMLTextAreaElement).value;
        this.setState({text: value});
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (this.state.status === 0) {
            this.setState({status: 1});
            this.props.editTask(this.state.id, {status: 1, text: this.state.text, token: this.props.token})
        } else {
            this.props.editTask(this.state.id, {text: this.state.text, token: this.props.token})
        }


    }

    renderStatus() {

        if (this.state.status === 0 || this.state.status === 1) {
            return (
                <input
                    onChange={this.updateStatus}
                    type="checkbox"/>
            )
        } else {
            return (
                <input
                    defaultChecked={true}
                    onChange={this.updateStatus}
                    type="checkbox"/>
            )
        }
    }

    render() {
        return (
            <>
                <div className="admin-task col-lg-4">

                    <div>
                        <div className="d-flex task-title card-title">
                            <div className="mr-1">
                                {this.props.username}
                            </div>
                            <div>
                                {this.props.email}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='task-card-text'>{this.props.text}</div>
                    </div>

                    <div className="editing_panel mt-5">
                        <form onSubmit={this.onSubmit}>
                            <label className='d-block'>
                                <span className="d-block mb-3">
                                    Изменить описание задачи
                                </span>
                                <textarea className="form-control" onChange={this.onTextChange}
                                          defaultValue={this.state.text} name="text"/>

                            </label>

                            <div>
                                <label className="d-flex justify-content-center align-items-center">
                                    <span className="d-block mr-3">Выполнено </span>
                                    {this.renderStatus()}

                                </label>
                            </div>
                            <input value="Изменить" className="btn btn-primary m-auto d-block" type="submit"/>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminTask;
