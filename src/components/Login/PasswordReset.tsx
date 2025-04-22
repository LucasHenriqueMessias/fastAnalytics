import React, { useEffect } from 'react'

const PasswordReset = () => {

       useEffect(() => {
            // Hide the navbar when the login component is mounted
            const navbar = document.querySelector('.navbar') as HTMLElement;
            if (navbar) {
                navbar.style.display = 'none';
            }
            // Show the navbar when the login component is unmounted
            return () => {
                if (navbar) {
                    navbar.style.display = 'block';
                }
            };
        }, []);
  return (
    <div>PasswordReset</div>
  )
}

export default PasswordReset