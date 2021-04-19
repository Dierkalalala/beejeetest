import React, {ChangeEvent, FormEvent} from "react";
import {IStoreState} from "../../store/types";
import {TasksEntityActions} from "../../store/tasks/actions";
import {ThunkDispatch} from "redux-thunk";
import {ITasksStore} from "../../store/tasks/types";
import {AnyAction} from "redux";
import {signInData} from "../../types/types";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";

type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;

interface DispatchToProps {
    logIn: (loginData: signInData) => void;
}

interface MapStateToProps {
    jwt: string,
    authError: string
}

interface IProps extends DispatchToProps, MapStateToProps {

}


class LoginPage extends React.Component<IProps> {

    state = {
        login: '',
        password: '',
        errorMessage: this.props.authError
    }

    onSubmit = (event: FormEvent) => {
        event.preventDefault();
        this.setState({errorMessage: ''})
        let {login, password} = this.state;

        if (login === '' || password === '') {
            this.setState({errorMessage: 'Заполните все поля'});
            return;
        }

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
            <div className="container">
                <form className="mt-5 auth_form" onSubmit={this.onSubmit}>
                    <label className="d-block mb-3">
                        <span className="d-block mb-2">Логин</span>
                        <input onChange={this.onControlChange} className="w-100 form-control" name='login' type='text' placeholder='Логин'/>
                    </label>
                    <label className="d-block mb-3">
                        <span className="d-block mb-2">Пароль</span>
                        <input onChange={this.onControlChange} className="w-100 form-control" name='password' type='password'
                               placeholder='*******'/>
                    </label>
                    <div className='error text-danger mb-3'>
                        {this.state.errorMessage ? this.state.errorMessage : this.props.authError}
                    </div>
                    <div>
                        <button className="btn btn-primary">Sign In</button>
                    </div>

                </form>
            </div>
        );
    }
}

const mapStateToProps = (state: IStoreState): MapStateToProps => ({
    jwt: state.tasks.jwt,
    authError: state.tasks.authError
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    logIn: (logInData: signInData) => dispatch(TasksEntityActions.logIn(logInData))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
