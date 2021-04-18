import React from "react";
import {Link} from "react-router-dom";
import {ThunkDispatch} from "redux-thunk";
import {ITasksStore} from "../../store/tasks/types";
import {AnyAction} from "redux";
import {TasksEntityActions} from "../../store/tasks/actions";
import {connect} from "react-redux";

type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;

interface DispatchToProps {
    checkAuth: () => void
}

class Layout extends React.PureComponent<DispatchToProps> {
    componentDidMount() {
        this.props.checkAuth()
    }

    render() {
        return (
            <div className="wrapper">
                <header>
                    <div className="row">
                        <div className="logotype">
                            <Link to='/' className='logo'>Logotype</Link>
                        </div>
                        <nav className="links">
                            <ul>
                                <li>
                                    <Link to='/' className='logo'>Somewhere else</Link>
                                </li>
                            </ul>
                        </nav>

                    </div>


                </header>

                {this.props.children}

            </div>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
    checkAuth: () => dispatch(TasksEntityActions.checkAuth())
});


export default connect(null, mapDispatchToProps)(Layout);
