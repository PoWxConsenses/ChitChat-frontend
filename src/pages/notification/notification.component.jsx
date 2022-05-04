import React from 'react'
import './notification.style.scss'
import {BsThreeDots} from 'react-icons/bs'
const NotificationPage = () => {
    return (
        <div className="notification-page">
            <div className="left-box">

            </div>

            <div className="notifications">
                {
                    [11,1,1].map(e => (
                        <div className="notification"> 
                        <div className="notification-img-container">
                            <img src="https://bit.ly/3yTW8pL" width="100%" height="100%" alt="?"/>
                        </div>
                        <div className="content">
                            kya hal mere bhai ke
                        </div>
                        <div className="noti-options">
                           <div className="noti-time">10h</div>
                           <div className="noti-option"><BsThreeDots /></div>
                        </div>
                    </div>
                    ))
                }
                

            </div>
        </div>
    )
}

export default NotificationPage;
