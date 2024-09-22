-initialize git
-.gitignore
-create a remoterepo to github
-push all code to remote origin
-play with routes and route extensions ex: /hello /hello/2
-orders of theroutesmatter a lot
-install postman app and make a workspace/collection > test api call
-write to logic to handle get,post,delete  API calls and test them on post man
-explore routing and use of *,?,+,(), in the routes
-use of regex in routes
-Reading the query params in routes
-reading the dynamic routes


ep-5
-multiple route handlers
-next()
-next function and errors along with res.send()
-app.use( "route",rH,[rH2,rH3],rH4  )
-what is middleware
-how expressjs basically handles request behind the scenes
-difference between app.use and app.all
-write a dummy auth for middleware for admin
-write a dummy auth for user except login
-error handling  using app.use("/",(err,req,res)=>{
    res.send("something went wrong ")
}) has to write last
- write try and catch

--ep6
-install mongoose.
-connect your app to database with connctingstring/devTinder.
-call the connectDB function and connect to database before starting application to 3000
-create a user Scheme
-create /signup API  to add data to database
-push some documents using API calls from posman.
-error handling using try,catch
