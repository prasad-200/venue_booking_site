# Venue Booking site

## Local Setup

1. clone it

```bash
git clone https://github.com/akshay782/venue_booking_site.git
# go to project directory
cd venue_booking_site
```

2. Install packages

- Backend => In root directory run following command
- Frontend => In client-side folder run same following command

```bash
npm install
```

3. Create `.env` file in the root directory and add following variables

```bash
dburl = 'your mongodb cluster url'
PORT = 'the port in which you want to run your nodejs/backend'
jwt_secret = 'your jwt secret'
```

4. Run it 🚴‍♂️

- Backend => First run following command in root directory, it will start server on port 2000
- Frontend => Second run same command in client side folder on another terminal, it will lauch react app

```bash
npm start
```

## To commit and push changes

Before you start working \
Always -

```bash
git pull
```

After you done making some changes

```bash
git checkout -b <branch_name>
git add .
git commit -m "message"
git push
```

- **Note** \
  Please don't commit on **main** branch

db.venues.insertMany([
...   {
...     "venueName": "Grand Hall",
...     "slug": "grand-hall",
...     "address": "123 Street, Mumbai",
...     "capacity": 300,
        "category":"conference",
        "location":"Mumbai",
        "ownerInfo":{
          "ownerName":"abc",
          "contactNumber":9004123121
        },
        "ownerId":"2303127",
...     "price": 5000,
...     "venuePictures": [
...        { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKJaWTNzwmgosQ1DXah-zt3UDOydh5ZGm8g&s" },
...       { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HBS7iK_UV-Ko9xXPmOcfL3Sm34wfNkQZew&s" }
...     ]
...   },
...   {
...     "venueName": "Royal Banquet",
...     "slug": "royal-banquet",
...     "address": "45 Avenue, Pune",
...     "capacity": 200,
        "category":"wedding",
        "location":"Pune",
        "ownerInfo":{
          "ownerName":"abc",
          "contactNumber":9004123121
        },
        "ownerId":"2303127",
...     "price": 4000,
...     "venuePictures": [
...       { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLlrFJ4JyS8pYYq-eVe670c9AeUvzBsfsosg&s" },
          { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe55IlO1Z-SU5ZfmQVGKTkijhld9_aqi8ZMw&s" }
...     ]
...   },
...   {
...     "venueName": "Sunset Gardens",
...     "slug": "sunset-gardens",
...     "address": "78 Park Lane, Bangalore",
...     "capacity": 150,
        "category":"conference",
        "location":"Bangalore",
        "ownerInfo":{
          "ownerName":"abc",
          "contactNumber":9004123121
        },
        "ownerId":"2303127",
...     "price": 3500,
...     "venuePictures": [
...       { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLlrFJ4JyS8pYYq-eVe670c9AeUvzBsfsosg&s" },
...       { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe55IlO1Z-SU5ZfmQVGKTkijhld9_aqi8ZMw&s" }
...     ]
...   },
...   {
...     "venueName": "Ocean View Hall",
...     "slug": "ocean-view-hall",
...     "address": "12 Beach Road, Goa",
...     "capacity": 250,
        "category":"wedding",
        "location":"Goa",
        "ownerInfo":{
          "ownerName":"abc",
          "contactNumber":9004123121
        },
        "ownerId":"2303127",
...     "price": 4800,
...     "venuePictures": [
...       { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNKJaWTNzwmgosQ1DXah-zt3UDOydh5ZGm8g&s" },
...       { "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9HBS7iK_UV-Ko9xXPmOcfL3Sm34wfNkQZew&s" }
...     ]
...   }
... ]);