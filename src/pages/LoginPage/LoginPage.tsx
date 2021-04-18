import React, {ChangeEvent, FormEvent} from "react";
import {IStoreState} from "../../store/types";
import {TasksEntityActions} from "../../store/tasks/actions";
import {ThunkDispatch} from "redux-thunk";
import {ITasksStore} from "../../store/tasks/types";
import {AnyAction} from "redux";
import {signInData} from "../../types/types";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;

interface DispatchToProps {
    logIn: (loginData: signInData) => void;
}
interface MapStateToProps {
    jwt: string
}
interface IProps extends DispatchToProps, MapStateToProps {

}



class LoginPage extends React.Component<IProps> {

    state = {
        login: '',
        password: '',
        errorMessage: ''
    }

    onSubmit = (event: FormEvent) => {
        event.preventDefault();
        let {login, password} = this.state;
        this.props.logIn({login, password});
    }

    onControlChange = (event: ChangeEvent) => {
        const target = event.target;
        const value = (target as HTMLInputElement).value;
        const propertyName = (target as HTMLInputElement).name;
        this.setState({
            [propertyName]: value
        });
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
            <form onSubmit={this.onSubmit}>
                <input onChange={this.onControlChange} name='login' type='text' placeholder='Логин'/>
                <input onChange={this.onControlChange} name='password' type='password'
                       placeholder='*******'/>

                <div>
                    <button>Sign In</button>
                </div>
                <div className='error'>
                    {this.state.errorMessage}
                </div>
            </form>
        );
    }
}

const mapStateToProps = (state: IStoreState): MapStateToProps => ({
    jwt: state.tasks.jwt
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    logIn: (logInData: signInData) => dispatch(TasksEntityActions.logIn(logInData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
