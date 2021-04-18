import AdminPage from "./AdminPage";
import withTasks from '../../components/hocs/withTasks';

const withTasksStartPage = withTasks(AdminPage);
export default withTasksStartPage;
