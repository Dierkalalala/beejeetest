import React, {ChangeEvent, FormEvent} from 'react';
import {TasksEntityActions} from "../../store/tasks/actions";
import {TaskCreationDTO} from "../../types/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {ITasksStore} from "../../store/tasks/types";
import {connect} from "react-redux";
import {IStoreState} from "../../store/types";
interface DispatchToProps {
    createNewTask: (newTaskData: TaskCreationDTO) => void;
}
type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;
interface IProps extends DispatchToProps {
    taskCreationError: StateToProps["taskCreationError"]
}
type StateToProps = {
    taskCreationError: string
}
class AddTaskForm extends React.Component<IProps> {

    state = {
        username: '',
        email: '',
        text: '',
        validationError: '',
    }

    onControlChange = (event: ChangeEvent) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        const propertyName = target.name;
        this.setState({
            [propertyName]: value
        });
    };

    submitForm = (event: FormEvent) => {
        event.preventDefault();
        this.setState({validationError: ''});
        const {username, email, text} = this.state;
        if (username === '' || email === '' || text === '') {
            this.setState({validationError: 'Заполните все поля'});
            return;
        }
        this.props.createNewTask({
            username, email, text
        })
        this.setState({username: '', email: '', text: ''});
        (event.target as HTMLFormElement).reset()

    }

    render() {
        return (
            <>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label className="d-block mb-3">
                            <span className="d-block mb-2">Имя пользователя</span>
                            <input className="w-100 form-control" onChange={this.onControlChange} type="text" name="username"/>
                        </label>
                    </div>
                    <div>
                        <label className="d-block mb-3">
                            <span className="d-block mb-2">Email</span>
                            <input className="w-100 form-control" onChange={this.onControlChange} type="email" name="email"/>
                        </label>
                    </div>
                    <div>
                        <label className="d-block mb-3">
                            <span className="d-block mb-2">Описание задачи</span>
                            <textarea className="form-control w-100" onChange={this.onControlChange} name="text"/>
                        </label>
                    </div>

                    <div className="text-danger mb-3">
                        {this.state.validationError ? this.state.validationError : this.props.taskCreationError}
                    </div>

                    <input type="submit" className="btn btn-success" value="Добавить задачу"/>

                </form>
            </>
        )
    }
}
const mapStateToProps = (state: IStoreState) : StateToProps => ({
    taskCreationError: state.tasks.taskCreationError
})
const mapDispatchToProps = (dispatch: Dispatch) : DispatchToProps => ({
    createNewTask: (newTaskData: TaskCreationDTO) => dispatch(TasksEntityActions.createTask(newTaskData))
})
export default connect(mapStateToProps, mapDispatchToProps)(AddTaskForm);
