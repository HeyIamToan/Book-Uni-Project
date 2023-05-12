-- Here is what I did in this project
+ pure html 
+ css: using sass to write css more flexible
    - responsive nav bar & slidehow
    - installed live sass compiler
    - modified some options in json setting file
    - the final css will be compiled to file named style.css (/dist/style.css)
+ create db.json contains some fake database, then
+ using json-server to generate fake restful API (http://localhost:3000/books)
+ using pure javascipt to manually create CRUD to manage books
    + add book item data from input, call API to add 1 more book item to db.json -> render to html
    + modify book item data from input, call API to modify db.json -> render to html
    + delete book item, call API to delete 1 item in db.json -> render to html