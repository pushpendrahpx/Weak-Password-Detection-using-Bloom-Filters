import React from 'react'
import './Login.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const Login = () => {
  return (
    <div className="main">
      <div className="logo">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-12 col-sm-12">
              <span
                style={{
                  borderRadius: '30px',
                  border: '5px solid #fff',
                  fontSize: '5.15em',
                  padding: '8px 20px',
                  backgroundColor: 'rgba(255,255,255,.15)',
                }}
                class="logo"
              >
                is my password weak:( ?
              </span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: '100px' }} class="searchContainer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <TextField
                className="alpha"
                id="outlined-basic"
                label="Enter Password"
                variant="outlined"
              />
              <Button
                style={{ padding: '15px', marginLeft: '10px', width: "100px" }}
                variant="contained"
              >
                Check
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
