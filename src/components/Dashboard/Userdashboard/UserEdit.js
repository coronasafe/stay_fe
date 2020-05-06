import React, { useEffect } from "react";
import EditPassword from "./EditPassword";
// import EditDetails from "./EditDetails";

export default function UserEdit() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <div className="min-h-full my-16 lg:flex sm:flex-column  items-center justify-center py-5 px-4 sm:px-6 lg:px-8">
            <EditPassword />
        </div>
    );
}
