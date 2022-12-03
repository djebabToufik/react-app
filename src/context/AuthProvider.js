
import { createContext } from "react";
// const AuthContext = createContext()

// export const AuthProvider =({children}) => {
//    const [auth,setAuth] = useState({test:"test"})

//    return (
//     <AuthContext.Provider value={{auth,setAuth}}>
//         {children}
//     </AuthContext.Provider>
//    )
// }

// export default AuthContext
export const AuthContext = createContext();