import {createContext, useState,useEffect} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState();
    const [loading, setLoading] = useState(true);
        useEffect(() => {
                try { 
                    const storedUser = localStorage.getItem('user');

                     if (storedUser) {
          
                        const parsedUser = JSON.parse(storedUser);
                        setAuth(parsedUser);
  
                    }
              } catch (error) {
                        console.error('Failed to parse user from localStorage', error);
                } finally{
                    setLoading(false);
            }
    },[]);
    useEffect(()=>{
        if (auth){
            localStorage.setItem('user', JSON.stringify(auth));
        }
        else{
            localStorage.removeItem('user');
        }
    },[auth])

    return (
        <AuthContext.Provider value = {{auth,setAuth,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContext;