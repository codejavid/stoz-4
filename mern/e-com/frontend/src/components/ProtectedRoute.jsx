import {Navigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";


const ProtectedRoute = ({children, requireAdmin=false}) => {

    const {user, loading} = useAuth();

    if(loading){
        return(
            <div className="flex justify-center items-baseline h-64">
                <p className="text-xl">Loading...</p>
            </div>
        )
    }

    if(!user){
        return <Navigate to="/login"/>
    }

    if(requireAdmin && !user.isAdmin){
        return <Navigate to="/login"/>
    }

    return children;




}

export default ProtectedRoute;