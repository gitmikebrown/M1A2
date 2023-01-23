const httpServer = require('http');
const url = require('url');
const fs = require('fs');
const formatter = new Intl.NumberFormat('en-us', {style: 'currency', currency: 'USD'})


const replaceTemplate = require('./modules/replaceTemplate');


/// Read data from file
// Data
const tempCourse = fs.readFileSync(
    `${__dirname}/data/loan.json`,
    'utf-8'
 );

 /////////////////////////////////
// Template
const templateHTMLCourse = fs.readFileSync(
    `${__dirname}/template/templateCourse.html`,
    'utf-8'
  );

 const dataObj = JSON.parse(tempCourse);// string to JavaScript Object JSON

////////////////////////////////
//Create Server
// const server = httpServer.createServer(function (req, res) {// call back function
const server = httpServer.createServer( (req, res) =>{// call back function

    
    const {query,pathname} = url.parse(req.url, true); // object distructors
    if(query.id){// if there is query parameter named id read as string
        // Courses page
        if (pathname === '/' || pathname.toLowerCase() === '/customer') {
            res.writeHead(200, {// Every thing ran successfully
                'Content-type': 'text/html'
            });

            const IR = dataObj[Number(query.id)].interestRate / 12;
            const PMT = dataObj[Number(query.id)].monthlyPayment;
            const nMonths = dataObj[Number(query.id)].loanTermYears * 12;
            const PV = formatter.format((PMT / IR) * (1-(1/(1+IR)**nMonths)))
            
            console.log(IR, PMT, nMonths, PV);

            

            const course = dataObj[Number(query.id)];// convert string to numeric value
            const strCourseName = JSON.stringify(course);
            const courseHTML = replaceTemplate(templateHTMLCourse, course, PV);// function that will replace the course values in the HTML
           
            res.end(courseHTML);
        }
    }
    else{
            res.writeHead(404, {// Server did not find what you were looking for
                'Content-type': 'text/html'
            });
            res.end(`resource not found`)
        }
    });

//Start Listening to requests
server.listen(8000, 'localhost', ()=> {
    console.log('Listening to requests on port 8000');
});

