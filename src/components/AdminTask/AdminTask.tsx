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
            await this.setState({status: 1});
            this.props.editTask(this.state.id, {status: 1, token: this.props.token})
        }
        if (this.state.status === 1) {
            await this.setState({status: 1});
            this.props.editTask(this.state.id, {status: 0, token: this.props.token})
        }
    }

    onSubmit = (e: FormEvent) => {
        e.preventDefault();
    }

    render() {
        return (
            <>
                <div className="admin-task">

                    <div>
                        <div className="row">
                            <div>
                                {this.props.username}
                            </div>
                            <div>
                                {this.props.email}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div>{this.props.text}</div>
                    </div>
                    <div>
                        Task 1 status
                    </div>
                    <div>

                        <div>
                            <button type="button" className="default-button">Edit</button>
                        </div>
                    </div>

                    <div className="editing_panel">
                        <form onSubmit={this.onSubmit}>
                            <textarea value={this.state.text} name="text"/>
                            <div>
                                <label>
                                    <span>Выполнено </span>
                                    {this.props.status !== 0 ?
                                        <input
                                            checked
                                            onChange={this.updateStatus}
                                            type="checkbox"/>
                                        :
                                        <input
                                            onChange={this.updateStatus}
                                            type="checkbox"/>
                                    }

                                </label>
                            </div>
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}

export default AdminTask;
