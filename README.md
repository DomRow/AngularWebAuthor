# AngularWebAuthor
A web authoring tool that allows re-construction of pages from JSON.

## Setup
First download the zip file associated with this project and extract it to a folder on your server.

Create a 'pages' database in your SQL server.
Import the 'page.sql' file to the 'pages' database - this will create the page table.

Go to the 'structure' tab in the table and change the 'jsonObj' column.
  - Change the "MIME type" to 'text/plain'
  - Change the "Browser Display Transform" to 'JSON (text/plain: JSON)'
   
This will display the hex string as their original formats.

Within the "index.php" file in the 'api' folder, change the connection properties to your local settings to allow access for the connection object.

Proceed to your server/localhost address to run the project.
