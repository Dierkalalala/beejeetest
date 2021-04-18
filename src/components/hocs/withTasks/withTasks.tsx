import React from "react";
import {IStoreState} from "../../../store/types";
import {connect} from "react-redux";
import {TasksEntityActions} from '../../../store/tasks/actions';
import {AnyAction} from "redux";
import {ITasksStore} from "../../../store/tasks/types";
import {ThunkDispatch} from "redux-thunk";

type ComponentProps = DispatchToProps;
type Dispatch = ThunkDispatch<ITasksStore, void, AnyAction>;
interface DispatchToProps {
    getTasks: () => void
}

function withTasks(WrappedComponent: React.ElementType) {

    class withTasks extends React.Component<ComponentProps>{
        componentDidMount() {
            this.props.getTasks();
        }

        render() {
            return (
                <WrappedComponent {...this.props}/>
        );
        }
    }


    const mapStateToProps = (state: IStoreState) => ({
        user: state.tasks
    });

    const mapDispatchToProps = (dispatch: Dispatch): DispatchToProps => ({
        getTasks: () => dispatch(TasksEntityActions.getTasks())
    });

    return connect(mapStateToProps, mapDispatchToProps)(withTasks);
}

export default withTasks;
