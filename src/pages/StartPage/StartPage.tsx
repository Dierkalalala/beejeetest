import React, {ChangeEvent} from "react";
import Task from "../../components/Task"
import Pagination from "react-js-pagination";
import AddTask from "../../components/AddTask";
import {IStoreState} from "../../store/types";
import {connect} from "react-redux";
import {Task as ITask} from "../../types/types";
import {ITasksStore} from "../../store/tasks/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {TasksEntityActions} from "../../store/tasks/actions";
import {Redirect} from "react-router-dom";

interface IDispatchToProps {
    getTasks: (additionalParams?: string) => void;
}

type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;

type StateProps = {
    tasks: IStoreState['tasks'],
    jwt: string
}

interface Props extends IDispatchToProps {
    tasks: IStoreState['tasks'],
    jwt: string
}

class StartPage extends React.Component<Props> {

    state = {
        activePage: 0,
        filteringValue: '',
        filteringType: '',
    };

    async handlePageChange(pageNumber: number) {
        await this.setState({activePage: pageNumber});

        this.reloadTasks();
    }

    handleSelectChange = async (e: ChangeEvent) => {
        let target = e.target as HTMLSelectElement;
        let name = target.name;
        let value = target.value;
        await this.setState({[name]: value});

        this.reloadTasks();
    }

    reloadTasks = () => {
        let query = '';

        query += `&page=${this.state.activePage + 1}`;

        if (this.state.filteringValue) {
            query += `&sort_field=${this.state.filteringValue}`;
        }
        if (this.state.filteringType) {
            query += `&sort_direction=${this.state.filteringType}`;
        }


        this.props.getTasks(query);
    }

    renderTasks(tasks: ITask[]) {
        if (tasks) {
            return (
                <>
                    {tasks.map(task => <Task
                        id={task.id}
                        username={task.username}
                        email={task.email}
                        text={task.text}
                        status={task.status}
                        key={task.id}/>)}
                </>
            )
        }
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
        if (this.props.jwt) {
            return (
                <Redirect
                    to={{
                        pathname: "/admin",
                    }}
                />
            )
        }

        return (
            <div>
                <h1> StartPage </h1>
                <div className="add_task_form_wrapper">
                    <AddTask/>
                </div>
                <div className="tasks">

                    <div className="tasks-sorting">
                        <div>
                            <div>
                                Отсортировать по
                            </div>
                            <div>
                                <select name="filteringValue" onChange={this.handleSelectChange}>
                                    <option selected disabled>Выберите опцию</option>
                                    <option value="id">
                                        Номеру
                                    </option>
                                    <option value="username">
                                        Владельцу
                                    </option>
                                    <option value="email">
                                        Email
                                    </option>
                                    <option value="status">
                                        Статусу
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                В порядке
                            </div>
                            <div>
                                <select name="filteringType" onChange={this.handleSelectChange}>
                                    <option selected disabled>Выберите опцию</option>
                                    <option value="desc">
                                        Убывания
                                    </option>
                                    <option value="asc">
                                        Возрастания
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="tasks-wrapper">
                        {this.renderTasks(this.props.tasks.item.tasks)}
                    </div>

                    {this.renderPagination(+this.props.tasks.item.total_task_count ? +this.props.tasks.item.total_task_count : 0)}

                </div>
            </div>

        )
    }
}

const mapStateToProps = (state: IStoreState): StateProps => ({
    tasks: state.tasks,
    jwt: state.tasks.jwt
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
    getTasks: (additionalParams: string = '') => dispatch(TasksEntityActions.getTasks(additionalParams))
})

export default connect(mapStateToProps, mapDispatchToProps)(StartPage);
