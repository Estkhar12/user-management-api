**This Assignment I have done.**

# User Management
### Signup:
- Collect basic details (email, phone number, name, profile image, password)
during the signup process.
- Ensure at least one of the phone number or email is provided during signup.
- Implement encryption for passwords.
### Login:
- Allow users to log in using email/phone and password.
### Modify User Details:
- Users can only modify their own name and profile image.
- Phone number and email, once entered, cannot be changed.
### Delete User:
- Users should have the ability to delete their accounts

## Roles and Access Control
### Roles:
- Define two roles: Admin and User.
### Admin Access:
- Admins can view, modify, and delete all user details.
### User Access:
- Users can only view, modify and delete their own details.
Admin Management
### Create Admin:
- Create APIs to allow the creation of admin accounts.
## Authentication and Security
### Authentication:
- Implement an authentication system using JSON Web Tokens (JWT).
### Password Encryption:
- Use bcrypt to securely encrypt user passwords.
## Image Storage
### Profile Image:
- Save profile images in the local system or integrate with a third-party service.
- Ensure that image URLs work, at least in the local environment.
## Database and Framework
### Framework:
- Utilize Express.js for API development.
### Database:
- Choose between MongoDB or Firebase for the database.
### Data Validation:
- Implement thorough data validation to ensure the correctness and integrity of
input data.
