import { Link } from "react-router-dom";
import "./userRead.css"
import { CalendarTodayOutlined, LocationSearching, MailOutline, PermIdentity, PhoneAndroid, Publish } from '@mui/icons-material';

export default function UserRead() {
  return (
    <div className="user">
        <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/users/add">
                <button className="userAddButton">Create</button>
            </Link>
        </div>
        <div className="userContainer">
            <div className="userShow">
                <div className="userShowTop">
                    <img 
                        src="https://cdn.pixabay.com/photo/2023/09/21/17/05/european-shorthair-8267220_640.jpg" 
                        alt="" 
                        className="userShowImg" 
                    />
                    <div className="userShowTopTitle">
                        <span className="userShowUserName">Anna Becker</span>
                        <span className="userShowUserTitle">Software Engineer</span>
                    </div>
                </div>
                <div className="userShowBottom">
                    <span className="userShowTitle">Account Details</span>
                    <div className="userShowInfo">
                        <PermIdentity className="userShowIcon" />
                        <span className="userShowInfoTitle">annabeck99</span>
                    </div>
                    <div className="userShowInfo">
                        <CalendarTodayOutlined className="userShowIcon" />
                        <span className="userShowInfoTitle">10. 12. 1999</span>
                    </div>
                    <span className="userShowTitle">Contact Details</span>
                    <div className="userShowInfo">
                        <PhoneAndroid className="userShowIcon" />
                        <span className="userShowInfoTitle">+1 123 456 78</span>
                    </div>
                    <div className="userShowInfo">
                        <MailOutline className="userShowIcon" />
                        <span className="userShowInfoTitle">annabeck99@gmail.com</span>
                    </div>
                    <div className="userShowInfo">
                        <LocationSearching className="userShowIcon" />
                        <span className="userShowInfoTitle">New York | USA</span>
                    </div>
                </div>
            </div>
            <div className="userUpdate">
                <span className="userUpdateTitle">Edit</span>
                <form className="userUpdateForm">
                    <div className="userUpdateLeft">
                        <div className="userUpdateItem">
                            <label className="">UserName</label>
                            <input 
                                type="text" 
                                placeholder="annabeck99" 
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label className="">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="Anna Becker" 
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label className="">Email</label>
                            <input 
                                type="text" 
                                placeholder="annabeck99@gmail.com" 
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label className="">Phone</label>
                            <input 
                                type="text" 
                                placeholder="+1 123 456 78" 
                                className="userUpdateInput"
                            />
                        </div>
                        <div className="userUpdateItem">
                            <label className="">Address</label>
                            <input 
                                type="text" 
                                placeholder="New York | USA" 
                                className="userUpdateInput"
                            />
                        </div>
                    </div>
                    <div className="userUpdateRight">
                        <div className="userUpdateUpload">
                            <img 
                                src="https://cdn.pixabay.com/photo/2023/09/21/17/05/european-shorthair-8267220_640.jpg" 
                                alt="" 
                                className="userUpdateImg" 
                            />
                            <label htmlFor="file">
                                <Publish className="userUpdateIcon" />
                            </label>
                            <input type="file" id="file" style={{display:"none"}}/>
                        </div>
                        <button className="userUpdateButton">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}
