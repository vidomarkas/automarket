# Automarket

Automarket is a car sales platform. Full stack web application.

## Project stack
 * React with hooks
 * NodeJS
 * Express
 * MongoDB hosted in cloud with Mongoose abstraction layer 
 
## Features

### Authentication
Users can register/login (authentication).
Users passwords are hashed and stored in database.

### Creating an ad
Form with required/not required fields with validation.
Postcode validation with server request.
Uploading of ad images to third party hosting (only saving hosted image address to Mongo database).
Ability to change featured, sold statuses, update other ad details.

### Ad display
Postcodes of ads are sent to third party service, which generates coordinates and these are shown in a map in Ad details page.
