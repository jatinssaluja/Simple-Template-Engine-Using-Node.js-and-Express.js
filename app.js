const express = require('express');

const app = express();


var fs = require('fs') // this engine requires the fs module
app.engine('tmpl', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(err)

   var rendered = content.toString();

   for(key in options){

    if(key !== 'settings' && key !== '_locals' && key !== 'cache')
   {
     if(options[key] instanceof Array){

       // Lines 26-28 grab the content between {{#each Stuff}} ... {{/each}}
        var reg = '(?:\{\{#each arrayName\}\})([\\s\\S]*?)(?:\{\{\/each\}\})';
        var re = new RegExp(reg.replace('arrayName', key));
        var rname = rendered.match(re)[1]; // contains the content between {{#each Stuff}} ... {{/each}}
        
        var rUnless = rname.match(/#unless/);

        const textArray = []; // will hold the contents of Stuff array

        if(rUnless){ // enters if {{#each Stuff}} ... {{/each}} contains {{#unless }}...{{/unless}}

           const unlessCondition = rname.match(/(?:#unless )(@\w+)/)[1];
           const unlessCharacter = rname.match(/{{#unless.*}}(.){{else}}/)[1];
           const elseCharacter = rname.match(/{{else}}(.){{\/unless}}/)[1];

           if(unlessCondition === '@last')
            {
                  options[key].forEach((x, index)=>{

                    let text = rname.replace(rname.match(/(\{\{#unless .*\}\})([\s\S]*?)(\{\{\/unless\}\})/)[0], '');

                     for(k in x){

                      text = text.replace(`{{${k}}}`, x[k]);
                    }

                  if(index !== options[key].length-1){

                     textArray.push(text+unlessCharacter);

                   } else{

                     textArray.push(text+elseCharacter);

                   }

               });

            }


        } else{ // enters if {{#each Stuff}} ... {{/each}} does not contain {{#unless }}...{{/unless}}

                  options[key].forEach((x)=>{

                        let text = rname;
                         for(k in x){

                          text = text.replace(`{{${k}}}`, x[k]);
                        }

                      textArray.push(text);
               });

           }

     // Lines 99 - 103 are aimed at replacing 'each loop' in the template with actual contents of array.
      var mregx1 = '(\{\{#each arrayName\}\})([\\s\\S]*?)(\{\{\/each\}\})';
      var mregx2 = new RegExp(mregx1.replace('arrayName', key));

       var dataToBeReplaced = rendered.match(mregx2)[0];
       rendered = rendered.replace(dataToBeReplaced, textArray.join(""));

     }

     else{

         rendered = rendered.replace(`{{${key}}}`, `${options[key]}`);

       }

   }

   }

    return callback(null, rendered)
  })
})


app.set('views', './views') // specify the views directory
app.set('view engine', 'tmpl') // register the template engine



app.get('/', function (req, res) {

    res.render('extra', {

    Name: 'Jatin Singh Saluja',
    Stuff:[

         {Thing:'roses', Desc:'red'},
         {Thing:'violets', Desc:'blue'},
         {Thing:'you', Desc:'able to solve this'},
         {Thing:'we', Desc:'interested in you'}
         ]

      })
})




app.listen(3000, ()=>{

console.log('Server is running');


});
