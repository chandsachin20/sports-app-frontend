import React from 'react'

function Dashboard() {
    const { userId} = localStorage.getItem('user');
    console.log(userId);
    return (
        <div>
            Dashboard
        </div>
    )
}

export default Dashboard
