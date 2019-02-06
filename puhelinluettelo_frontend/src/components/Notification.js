import React from 'react'
import './Notification.css'

const Notification = ({ message }) => {
    if (message.message === '') {
      return null
    }

    if(!message.isError) {
        return (
            <div className="success">
              {message.message}
            </div>
        )
    }
  
    return (
      <div className="error">
        {message.message}
      </div>
    )
  }

  export default Notification