import React from "react";

type TaskProps = {
    id: number
    username: string,
    email: string,
    status: 0 | 1 | 10 | 11,
    text: string
}

class Task extends React.Component<TaskProps> {
    renderTaskStatus(status: number) {
        switch (status) {
            case 0:
                return (
                    <>
                        <div className="d-flex justify-content-center">
                            Не выполнено
                        </div>
                    </>
                )
            case 1:
                return (
                    <>
                        <div className="d-flex justify-content-between">
                            <p>
                                Не выполнено
                            </p>
                            <p>
                                отредактировано
                            </p>
                        </div>
                    </>
                )
            case 10:
                return (
                    <>
                        <div className="d-flex justify-content-center">
                            Выполнено
                        </div>
                    </>
                )
            case 11:
                return (
                    <>
                        <div className="d-flex justify-content-between">
                            <p>Выполнено</p> <p> отредактировано</p>
                        </div>
                    </>
                )
        }
    }

    render() {
        return (
            <div className="col-lg-4 text-center">
                <div className="">
                    <div className="d-flex task-title card-title justify-content-center">
                        <div className="mr-2">
                            {this.props.username}
                        </div>
                        <div>
                            {this.props.email}
                        </div>
                    </div>

                </div>
                <div className="card-body">
                    <div className="task-card-text card-text">{this.props.text}</div>
                </div>
                {this.renderTaskStatus(this.props.status)}
            </div>
        )
    }
}

export default Task;
