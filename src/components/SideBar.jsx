import React, { useEffect, useState } from 'react';
import "../styles/sidebar.css"
export default () => {
    const onDragStart = (event, module) => {
        event.dataTransfer.setData('application/reactflow', module);
        event.dataTransfer.effectAllowed = 'move';
    };

    const [modules, setModules] = useState([])
    const [page, setpage] = useState(1)
    useEffect(() => {

        const getModules = async () => {
            const url = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`
            const response = await fetch(url);

            if (!response.ok) {
                throw { message: 'Cound not fetch data' }
            } else {
                const resData = await response.json();
                setModules(resData)
            }
        }
        getModules();
    }, [page])

    return (
        <aside>
            {
                modules.map(module =>
                (
                    <div className="module" onDragStart={(event) => onDragStart(event, module.input_type + module.name)} draggable>
                        {(module.input_type) + " || " + module.name + " || " + module.name[1]}
                    </div>
                ))
            }
            <input type='range' defaultValue={1} min={1} max={20} onChange={(e) => setpage(e.target.value)} />
            <h1>
                {page}
            </h1>

        </aside>
    );
};
