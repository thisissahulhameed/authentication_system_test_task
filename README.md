# Authentication System in next.js

# stack
    Next.js(full framework)
    MYSQL (Database)


# User Registration 
pages/register.js -- frontend which displays the register form

pages/api/registerPostApi.js -- backend api handler to save the data in MYSQL DB

# User Login
pages/login.js -- frontend which displays the login form

pages/api/loginPostApi.js -- backend api handler to authenticate the data from MYSQL and create session for the authenticated users

# Session Management
lib/session.js 

    -> Creates session using users credentials and jwt for the authenticated user
    
    -> Retrives(get) the session for the aurthorization
    
    -> Destroys the session for logged out user

# Google OAuth

implemented google oauth using nextauth.js and handled their session 

# Logout

pages/api/logoutPostApi.js -- backend api handler to destroy the session for the authenticated user

Google oauth signout 

# Profile
pages/profile.js -- frontend which displays authorized user from jwt session or oauth session

-->Output Screecshots are also included 


