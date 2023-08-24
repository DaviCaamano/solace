## MkCert is Required for Localhost deployment of this project.
This directory exists to enable https over localhost for the purposes of developing the auth0 implementation.

Auth0 requires a https connection for the login redirection (`/api/auth/report`)
This endpoint will create a new user upon a successful auth0 login before redirecting the request to the 
    `/api/auth/authorize` route which finalizes the authentication.


## Installation
You will need mkcert to run this project locally.

Please see this repo for installation instruction
https://github.com/FiloSottile/mkcert

### Windows user

open powershell with "run as administrator" then install with chocolatey
```
choco install mkcert
```

## Usage

once installed run: 
```
mkcert -install
mkcert localhost
```

This should create a `localhost.pem` and `localhost-key.pem` in the project root.

### **These files must be moved to the `/root/packages/config/mkcert` directory**

This these files will be git ignored.

Ensure that these files have the names 'localhost.pem' and 'localhost-key.pem'.

