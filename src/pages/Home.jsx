import React from 'react'
import TableRow from "../components/TableRow";
import { useLoaderData } from "react-router-dom";
import "../styles/home.css"
const Home = () => {
    const workflows = useLoaderData();
    return (
        <div className="container">
            <h1 className="heading">Workflows</h1>
            <div className="workflows">
                <table>
                    <tbody>
                        <tr className='first-row'>
                            <td>Name</td>
                            <td>Input Type</td>
                            <td>Created At</td>
                        </tr>
                        {workflows.map((workflow, index) => (
                            <TableRow workflow={workflow} key={workflow.id} index={index} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Home
export const loader = async () => {

    const response = await fetch('https://64307b10d4518cfb0e50e555.mockapi.io/workflow');

    if (!response.ok) {
        throw { message: 'Cound not fetch data' }
    } else {
        const resData = await response.json();
        return resData
    }

}