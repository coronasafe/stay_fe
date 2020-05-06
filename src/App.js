import React, { useState } from "react";
import AppRouter from "./Router/AppRouter";
import PublicRouter from "./Router/PublicRouter";
import FacilitatorRouter from "./Router/FacilitatorRouter";
import { useAbortableEffect } from "./util/useAbortableEffect";
import { getCurrentUser } from "./Redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { FullLoading } from "./components/common/Loader";
import { USER_TYPES } from "./Common/constants";

function App() {
    const dispatch = useDispatch();
    const state = useSelector((reduxState) => reduxState);
    const { currentUser } = state;
    const [user, setUser] = useState(false);

    // const updateRefreshToken = () => {
    //   const refresh = localStorage.getItem('refresh_token');
    //   const access = localStorage.getItem('access_token');
    //
    //   // if access token is invalid and refresh token is valid
    //   // remove refresh token
    //
    //   if( !access && refresh ){
    //     localStorage.removeItem('refresh_token')
    //     document.location.reload();
    //     return;
    //   }
    //
    //   if(!refresh){
    //     return;
    //   }
    //   axios.post('https://api.care.coronasafe.in/api/v1/auth/token/refresh/',{
    //     refresh
    //   }).then(res=>{
    //     localStorage.setItem('access_token',res.data.access)
    //     localStorage.setItem('refresh_token',res.data.refresh)
    //   })
    //   .catch( err=>{
    //     console.log('Error when refreshing', err)
    //   })
    // }
    //
    // useEffect(() => {
    //   updateRefreshToken()
    //   setInterval(updateRefreshToken, 5 * 60 * 1000)
    // }, [])

    // Removing Causes Infinite Loop
    useAbortableEffect(
        async (status) => {
            const access = localStorage.getItem("stay_access_token");
            if (access) {
                const res = await dispatch(getCurrentUser());
                if (!status.aborted && res && res.statusCode === 200) {
                    setUser(res.data);
                }
            } else {
                setUser(null);
            }
        },
        [dispatch]
    );

    // keep isLoading in redux, so that if any component is loading
    // App component will render loading page
    // This can be kept within AppRouter as well incase navbar needs
    // to be kept on UI
    if (user !== null && (!currentUser || currentUser.isFetching)) {
        return <FullLoading />;
    }

    if (currentUser && currentUser.data) {
        if (
            [USER_TYPES.FACILITY_OWNER.type, USER_TYPES.ADMIN.type].includes(
                currentUser.data.data.type
            )
        ) {
            return <FacilitatorRouter />;
        } else {
            return <AppRouter />;
        }
    } else {
        return <PublicRouter />;
    }
}

export default App;
