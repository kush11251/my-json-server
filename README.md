# JSON Server

A simple Node.js JSON server that serves JSON data from files in the `assets` folder and supports CRUD operations.

## Features

- Automatically loads JSON files from `assets/` folder
- Creates REST API endpoints for each JSON file
- Supports GET, POST, PUT, DELETE operations
- Data is stored in memory (resets on restart)
- Deployable on Render and Vercel

## API Endpoints

For each `filename.json` in `assets/`, the following endpoints are created:

- `GET /filename` - Get all items
- `GET /filename/:id` - Get single item by ID
- `POST /filename` - Create new item
- `PUT /filename/:id` - Update item by ID
- `DELETE /filename/:id` - Delete item by ID

## Setup

1. Clone the repository
2. Run `npm install`
3. Add your JSON files to the `assets/` folder
4. Run `npm start`

## Deployment

### Render

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set Build Command: `npm install`
4. Set Start Command: `npm start`
5. Deploy

### Vercel

1. Connect your GitHub repository to Vercel
2. Deploy (Vercel will automatically detect the Node.js app)

## Example

With `assets/users.json`:

```json
[
  {"id": 1, "name": "John"},
  {"id": 2, "name": "Jane"}
]
```

API calls:

- `GET /users` → Returns the array
- `POST /users` with `{"name": "Bob"}` → Adds new user
- `PUT /users/1` with `{"name": "Johnny"}` → Updates user 1
- `DELETE /users/2` → Deletes user 2