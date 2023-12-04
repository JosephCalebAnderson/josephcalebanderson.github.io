import React, { useEffect, useState } from "react";
import './ManageUsers.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AdminHeader from "../Components/AdminHeader";
import BackButton from "../Components/BackButton";
import { Link } from "react-router-dom";


export const ManageUsers = () => {
    const location = useLocation();
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [inputFields, setInputFields] = useState([
        { id: "userName",value: "",label: "User Name", placeholder: "Enter username" },
        { id: "fullName", value: "",label: "Name", placeholder: "Enter full name" },
        { id: "email",value: "", label: "Email", placeholder: "Enter email" },
        { id: "password",value: "", label: "Password", placeholder: "Enter password" },
        { id: "phone",value: "", label: "Phone", placeholder: "Enter phone number"},
        { id: "dateOfBirth",value: "", label: "Date of Birth", placeholder: "Enter date of birth"},
        { id: "isAdmin", value: false,label: "Admin?", placeholder: "Enter true or false"},
    ]);


   
    //need to fetch users from database
    const loginData = location.state.loginData;
    console.log(location.state);
    useEffect(() => {
        const fetchData = async () => {
        const response = await fetch (`http://localhost:4000/api/users`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const Data = await response.json();
        console.log(Data);
        setUsers(Data);
    }
    fetchData()
    .catch(console.error);
    }, []);


    // Adding a new user
    const addUser = async (e) => {
        // Check for the required fields
        e.preventDefault();
    //    Output the individual values of the input fields

        if(!inputFields[0].value || !inputFields[1].value || !inputFields[2].value || !inputFields[3].value || !inputFields[4].value || !inputFields[5].value) {
           // alert('Please fill out all fields');
              setErrorMessage('Please fill out all fields');
            return;
        }
        // Create the user object
        const newUser = {
            email : inputFields[2].value,
            password : inputFields[3].value,
            username : inputFields[0].value,
            fullName : inputFields[1].value,
            phoneNumber : inputFields[4].value,
            dob : inputFields[5].value,
            admin : inputFields[6].value,
            promotions: false
        };
        // Send the new user data to the backend
        try {
            const response = await fetch('http://localhost:4000/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });
            const data = await response.json();
            console.log(data);
            // If the user is added succesfully alert the user
            window.location.reload();
        } catch (error) {
            // If the user is not added, alert the user
            console.error(error);
           // alert(error);
              setErrorMessage(error);
        }
    }
    // Deleting a user
    const deleteUser = async (id) => {
        // Send the user id to the backend
        try {
            console.log(id)
            const response = await fetch(`http://localhost:4000/api/users/id/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log(data);
            // // Now delete the user's saved addresses
            const response2 = await fetch(`http://localhost:4000/api/addresses/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data2 = await response2.json();
            console.log(data2);
            // Now delete the user's saved payment methods
            const response3 = await fetch(`http://localhost:4000/api/paymentCards/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data3 = await response3.json();
            console.log(data3);
            // If the user is deleted, alert the user
            // Refresh the page
            window.location.reload();
        } catch (error) {
            // If the user is not deleted, alert the user
            console.error(error);
           // alert(error);
                setErrorMessage(error);
        }
    }

    // Update the user's status to suspended
    const suspendUser = async (id,status) => {
        // Send the user id to the backend
        // If the user is already suspended, instead unsuspend the user
        if(status === "SUSPENDED") {
            try {
                // console.log(id)
                const response = await fetch(`http://localhost:4000/api/users/status/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userStatus: "INACTIVE"})
                });
                const data = await response.json();
                console.log(data);
                // If the user is unsuspended, alert the user
              //  alert("User unsuspended");
                setErrorMessage('User unsuspended');
                // Refresh the page
                window.location.reload();
            } catch (error) {
                // If the user is not unsuspended, alert the user
                console.error(error);
              //  alert(error);
                    setErrorMessage(error);
            }
            return;
        }
        // Otherwise, suspend the user
        else {
        try {
            // console.log(id)
            const response = await fetch(`http://localhost:4000/api/users/status/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userStatus: "SUSPENDED"})
            });
            const data = await response.json();
            console.log(data);
            // If the user is suspended, alert the user
          //  alert("User suspended");
            setErrorMessage('User suspended');
            // Refresh the page
            window.location.reload();
        } catch (error) {
            // If the user is not suspended, alert the user
            console.error(error);
           // alert(error);
                setErrorMessage(error);
        }
    }
}
    // Updating a user fields
    const handleInputChange = (id,value) => {
        setInputFields((prevInputFields) => 
            prevInputFields.map((field) => 
                field.id === id ? {...field, value} : field
            )
        );
    console.log(inputFields);
};

   return (
    <div>
        <AdminHeader/>
        <BackButton />
        <div className="manage-users">
            <h2 className="manageUsersTitle">Manage Users</h2>
            <div className="user-list">
                <h3 class='userListHeading'>User List</h3>
                <ul class='manageUsersList'>
        {users.map((user) => (
            <li key={user.id}>
                <div className="user-instance">
                    <p className="user-name">Name: {user.fullName}</p>
                    <p className="user-username">Username: {user.username}</p>
                    {!user.admin && <p className="user-admin">Type: User</p>}
                    {user.admin && <p className="user-admin">Type: Admin</p>}
                    <p className="user-status">Status: {user.userStatus}</p>
                    <button className="user-edit" onClick = {() => navigate(`/admineditusers`, {state: {user, loginData}})}>Edit User Info</button>
                    <button className="user-delete "onClick = {() => deleteUser(user._id)}>Delete User</button>
                    <button className="user-suspend" onClick = {() => suspendUser(user._id, user.userStatus)}>Suspend User</button>
                </div>
            </li>
        ))}
        </ul>   
    </div>
    <h3 class='userListHeading'>Add New User</h3>
    <div className="add-user">
        <form onSubmit={addUser}>
            {inputFields.map((field,index) => (
                <label key={index} htmlFor={field.id} class='manageUsersLabel'>
                    {field.label}
                    {field.id === "isAdmin" ? (
                        <input
                            className="manageUsersInputCheckbox"
                            type="checkbox"
                            id={field.id}
                            placeholder={field.placeholder}
                            value = {field.value}
                            onChange = {(e) => handleInputChange(field.id, e.target.checked)}
                            
                        />
                    ) : (
                    <input
                        className="manageUsersInput"
                        type="text"
                        id={field.id}
                        placeholder={field.placeholder}
                        value = {field.value}
                        onChange = {(e) => handleInputChange(field.id, e.target.value)}
                    
                    />
                    )}
                </label>
            ))}
            <button type="submit" className="add-button">Add User</button>
            {errorMessage && <p className="errorMessage-manageusers">{errorMessage}</p>}
        </form>
    </div>
</div>
</div>
   );
    
}