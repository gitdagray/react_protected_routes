import { useState, useEffect } from "react"
import axios from "../api/axios";

const Users = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUsers = async () => {
            try {
                const response = await axios.get("/users", {
                    signal: controller.signal
                })
                console.log(response.data);
                isMounted && setUsers(response.data);
            } catch (e) { console.log(e) }
        }
        getUsers();
        // useeffect cleanup function
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])
    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (<ul>{users.map((user, i) => <li key={i}>{user?.username}</li>)}</ul>) : (

                    <p>No users to dipplay</p>
                )
            }
        </article>
    )
}

export default Users