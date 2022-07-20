import {TasksDefaultTable} from "../tasks/TasksDefaultTable";
import {useAuth0} from "@auth0/auth0-react";
import {useEffect} from "react";
import {Users} from "../../agent/agent";

export const Home = () => {

    const {user, isAuthenticated} = useAuth0();

    useEffect(() => {
        if (isAuthenticated)
            Users.createUser(user).catch(e => console.error(e));
    });


    return (<div className={"container mt-5"}>
        <div className={"d-flex"}>
            <i className={"fa-solid fa-list-check me-3 fs-1"}/>
            <h3 className={"text-capitalize fw-bold"}>{user.name}'s ToDo's</h3>
        </div>
        <div className={"d-flex mt-3"}>
            <TasksDefaultTable/>
        </div>
    </div>);
}
