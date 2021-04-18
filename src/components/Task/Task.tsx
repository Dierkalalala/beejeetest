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
                        Не выполнено
                    </>
                )
            case 1:
                return (
                    <>
                        Не выполнено, отредактировано
                    </>
                )
            case 10:
                return (
                    <>
                        Выполнено
                    </>
                )
            case 11:
                return (
                    <>
                        Выполнено, отредактировано
                    </>
                )
        }
    }
    render() {
        return (
            <div>
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
            </div>
        )
    }
}
export default Task;
