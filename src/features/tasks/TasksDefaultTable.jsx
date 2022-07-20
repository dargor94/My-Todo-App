import {DataGrid} from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {Tasks} from "../../agent/agent";
import {toSentenceCase} from "../../utils/utils";
import styles from "./css/global.module.css";
import fireIcon from "../../assets/constants/icons";

export const TasksDefaultTable = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const perPage = 10;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        fetchTasks(0);
    }, []);

    const fetchTasks = (page, size = perPage) => {
        setLoading(true);
        Tasks.list("57de5bc7-c674-4615-9ba8-1e753646d49c", page, size).then(data => {
            setTasks(data.content || []);
            setTotalRows(data.totalElements || 0);
            setLoading(false);
        }).catch((e) => console.error(e));

    }

    const handlePageChange = async page => {
        await fetchTasks(page);
        setCurrentPage(page);
    };

    const columns = [{
        field: 'id', headerName: 'ID', width: 70,
    }, {
        field: 'name', headerName: 'Name', width: 130, valueGetter: (params) => `${toSentenceCase(params.row.name)}`,
    }, {
        field: 'status',
        headerName: 'Status',
        width: 130,
        valueGetter: (params) => `${toSentenceCase(params.row.status)}`
    }, {
        field: 'priority', headerName: 'Priority', width: 100, renderCell: (params) => (<div
            className={`${styles.MyBadge} + ${params.row.priority === "HIGH" ? styles.PriorityHigh : params.row.priority === "MEDIUM" ? styles.PriorityMedium : styles.PriorityLow}`}>
            <span>{toSentenceCase(params.row.priority)}</span>
            <span>{params.row.priority === "HIGH" && fireIcon}</span>
        </div>),

    }, {
        field: 'dueDate', headerName: 'Due Date', width: 150,
    }, {
        field: 'createdOn', headerName: 'Date Created', width: 200,
    }];

    return (<DataGrid
        rows={tasks}
        columns={columns}
        pageSize={perPage}
        rowsPerPageOptions={[perPage]}
        checkboxSelection
        autoHeight
        paginationMode={"server"}
        rowCount={totalRows}
        loading={loading}
        page={currentPage}
        onPageChange={(newPage) => handlePageChange(newPage)}
        initialState={{
            columns: {
                columnVisibilityModel: {id: false}
            }
        }}
    />)

}