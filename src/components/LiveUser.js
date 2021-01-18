import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LiveUser = () => {
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const getUsers = async () => {
    try {
      const { data } = await axios('https://randomuser.me/api?results=50')
      setUsers(data.results)
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }

  useEffect(() => {
    getUsers()
    // setShowUsers([...users])
  }, [])

  useEffect(() => {
    if (!searchTerm) {
      setShowUsers([...users])
    } else {
      setShowUsers(() =>
        [...users].filter((user) => {
          const searchString =
            user.name.first.toLowerCase() +
            ' ' +
            user.name.last.toLowerCase() +
            ' ' +
            user.location.city.toLowerCase() +
            ' ' +
            user.location.country.toLowerCase()
          return searchString.includes(searchTerm.toLowerCase())
          // user.name.first.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // user.name.last.toLowerCase().includes(searchTerm.toLowerCase()) ||
          // user.location.city
          //   .toLowerCase()
          //   .includes(searchTerm.toLowerCase()) ||
          // user.location.country
          //   .toLowerCase()
          //   .includes(searchTerm.toLowerCase())
        })
      )
    }
  }, [users, searchTerm])

  return (
    <div className='container'>
      <header className='header'>
        <h4 className='title'>Live User Filter</h4>
        <small className='subtitle'>Search by name and/or location</small>
        <input
          type='text'
          id='filter'
          value={searchTerm}
          placeholder='Search'
          onChange={(e) => handleChange(e)}
        />
      </header>

      <ul id='result' className='user-list'>
        {users.length === 0 ? (
          <li>
            <h3>Loading...</h3>
          </li>
        ) : showUsers.length === 0 ? (
          <li>
            <h3>No user Found</h3>
          </li>
        ) : (
          showUsers.map((user, index) => (
            <li key={index}>
              <img src={user.picture.large} alt={user.name.first} />
              <div className='user-info'>
                <h4>
                  {user.name.first} {user.name.last}
                </h4>
                <p>
                  {user.location.city}, {user.location.country}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default LiveUser
