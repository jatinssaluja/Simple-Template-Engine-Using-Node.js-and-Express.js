I implemented the template engine using Node.js and Express.js. My code handles both templates, template.tmpl and extra.tmpl.

In order to run my code, please go to command line, change to the project directory and execute the following steps sequentially:

1) Run 'npm install' command.

2) Run 'npm run dev' command.

3) After running command in step 2, the server will start. Go to the url http://localhost:3000/ and the output will appear for extra.tmpl. In order to change the template file, change the name of template from 'extra' to 'template' in res.render().

Also, I have included the snapshots of both the templates, extra_screenshot for extra.tmpl and template_screenshot for template.tmpl.

Input Data to templates: 

I have used the following object literal in Node.js as input data to templates.


  {
    Name: 'Jatin Singh Saluja',
    Stuff:[

         {Thing:'roses', Desc:'red'},
         {Thing:'violets', Desc:'blue'},
         {Thing:'you', Desc:'able to solve this'},
         {Thing:'we', Desc:'interested in you'}
         ]

      }