import { createContext, useEffect, useState } from "react";
import HTTP from "../../../HTTP";
export const Context = createContext();


export default function ContextProvider({ children }) {
    const [loginUserName, setLoginUserName] = useState(localStorage.getItem("username") ?? "")
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem("username") ?? "")
    const [userID, setUserID] = useState(localStorage.getItem("userID") ?? "")

    useEffect(() => {
        HTTP.get(`users/${userID}`).then(res => {
            setIsAdmin(res.data.isAdmin);
            console.log(res.data)
        })
    }, [])

    return (
        <Context.Provider value={{
            loginUserName, setLoginUserName,
            isAdmin, setIsAdmin,
            userID, setUserID
        }}>
            {children}
        </Context.Provider>
    )
}