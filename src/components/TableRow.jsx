import React from 'react'
import { Link } from "react-router-dom";

const TableRow = ({ workflow, index }) => {
    let str = workflow.input_type;
    let upperStr = str.toUpperCase();
    return (
        <tr className={index % 2 ? 'odd-row' : 'even-row'}>
            <td>
                <Link to={`/${workflow.id}`}>
                    {workflow.name}
                </Link>
            </td>
            <td>{upperStr}</td>
            <td>{workflow.createdAt.substring(0, 10)}</td>
        </tr>
    )
}

export default TableRow