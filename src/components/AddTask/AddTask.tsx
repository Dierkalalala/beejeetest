import React, {ChangeEvent, FormEvent} from 'react';
import {TasksEntityActions} from "../../store/tasks/actions";
import {TaskCreationDTO} from "../../types/types";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {ITasksStore} from "../../store/tasks/types";
import {connect} from "react-redux";
interface DispatchToProps {
    createNewTask: (newTaskData: TaskCreationDTO) => void;
}
type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;
interface IProps extends DispatchToProps {

}

class AddTaskForm extends React.Component<IProps> {

    state = {
        username: '',
        email: '',
        text: '',
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
        const {username, email, text} = this.state;

        this.props.createNewTask({
            username, email, text
        })

    }

    render() {
        return (
            <>
                <form onSubmit={this.submitForm}>
                    <div>
                        <label>
                            <span>Имя пользователя</span>
                            <input onChange={this.onControlChange} type="text" name="username"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Email</span>
                            <input onChange={this.onControlChange} type="email" name="email"/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Описание задачи</span>
                            <textarea onChange={this.onControlChange} name="text"/>
                        </label>
                    </div>

                    <input type="submit" value="Отправить"/>

                </form>
            </>
        )
    }
}
const mapDispatchToProps = (dispatch: Dispatch) : DispatchToProps => ({
    createNewTask: (newTaskData: TaskCreationDTO) => dispatch(TasksEntityActions.createTask(newTaskData))
})
export default connect(null, mapDispatchToProps)(AddTaskForm);
