import React from "react";
import {Link} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {ITasksStore} from "../../store/tasks/types";
import {AnyAction} from "redux";
import {TasksEntityActions} from "../../store/tasks/actions";
import {connect} from "react-redux";
import {IStoreState} from "../../store/types";
import './Layout.css'

type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;

interface DispatchToProps {
    checkAuth: () => void,
    logOut: () => void,
}

type StateToProps = {
    jwt: string
}

interface IProps extends DispatchToProps {
    jwt: StateToProps['jwt']
}

class Layout extends React.PureComponent<IProps> {
    componentDidMount() {
        this.props.checkAuth()
    }

    logOut = () => {
        this.props.logOut();
    }

    render() {
        let {jwt} = this.props

        return (
            <div className="wrapper">
                <header>
                    <div className="container">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="logotype">
                                <Link to='/' className='logo'>
                                    <img src="http://betta3.hardweb.pro/assets/img/common/logo.svg" alt=""/>
                                </Link>
                            </div>
                            <nav className="links">
                                <ul className="links-ul">
                                    {jwt ?
                                        <li>
                                            <button className="btn btn-danger" type="button" onClick={this.logOut}> Log
                                                out
                                            </button>
                                        </li>
                                        :
                                        <li>
                                            <button className='logo btn btn-primary'>
                                                <Link className="text-white" to='/login' >Log in</Link>
                                            </button>
                                        </li>
                                    }

                                </ul>
                            </nav>

                        </div>
                    </div>
                </header>

                {this.props.children}

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    checkAuth: () => dispatch(TasksEntityActions.checkAuth()),
    logOut: () => dispatch(TasksEntityActions.logOut())
});

const mapStateToProps = (state: IStoreState): StateToProps => ({
    jwt: state.tasks.jwt
})


export default connect(mapStateToProps, mapDispatchToProps)(Layout);
