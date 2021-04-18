import React from "react";
import AdminTask from "../../components/AdminTask"
import {IStoreState} from "../../store/types";
import {TasksEntityActions} from "../../store/tasks/actions";
import {connect} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {ITasksStore} from "../../store/tasks/types";
import {AnyAction} from "redux";
import {Task as ITask, TaskEditing,} from "../../types/types";
import Pagination from "react-js-pagination";

type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;

type StateProps = {
    tasks: ITasksStore
}
interface DispatchToProps {
    editTask: (id: number, editTask: TaskEditing) => void;
    getTasks: (additionalParams?: string) => void;
}

interface IProps extends DispatchToProps {
    tasks: StateProps['tasks']
}


class AdminPage extends React.PureComponent<IProps> {

    state = {
        activePage: 1
    }

    renderTasks(tasks: ITask[]) {
        if (tasks) {
            return (
                <>
                    {tasks.map(task => <AdminTask
                        id={task.id}
                        username={task.username}
                        email={task.email}
                        text={task.text}
                        status={task.status}
                        key={task.id}
                        token={this.props.tasks.jwt}
                        editTask={this.props.editTask}
                    />)}
                </>
            )
        }
    }

    async handlePageChange(pageNumber: number) {
        await this.setState({activePage: pageNumber});

        this.reloadTasks();
    }

    reloadTasks = () => {
        let query = '';

        query += `&page=${this.state.activePage + 1}`;

        this.props.getTasks(query);
    }

    renderPagination(totalTaskCount: number) {
        if (totalTaskCount > 3) {
            return (
                <>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={totalTaskCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    >


                    </Pagination>
                </>
            )
        }
    }

    render() {
        const {tasks} = this.props
        return (
            <div>
                <h1> Admin Page for tasks editing </h1>

                <div className="tasks">

                    <div className="tasks-wrapper">
                        {this.renderTasks(tasks.item.tasks)}
                    </div>
                </div>

                {this.renderPagination(+this.props.tasks.item.total_task_count ? +this.props.tasks.item.total_task_count : 0)}
            </div>

        )
    }
}
const mapStateToProps = (state: IStoreState): StateProps => ({
    tasks: state.tasks,

});

const mapDispatchToProps = (dispatch: Dispatch) : DispatchToProps => ({
    editTask: (id: number, editTask: TaskEditing) => dispatch(TasksEntityActions.editTask(id, editTask)),
    getTasks: (additionalParams: string = '') => dispatch(TasksEntityActions.getTasks(additionalParams))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);

