const express = require('express');
const app = express();
const config = require('./config');
const Task = require('./Models/Task');

app.use(express.urlencoded({extended: false}));

//Establish connetion to database
config.authenticate().then(function(){
  console.log('Database is connected');
}).catch(function(err){
  console.log(err);
});

//List all tasks
app.get('/', function(req, res){
   
  Task.findAll().then(function(result){
      res.status(200).send(result);
  }).catch(function(err){
      res.status(500).send(err);
  });
});

 //Create a new task
 app.post('/', function(req, res){
    Task.create(req.body).then(function(result){
      res.redirect('/'); //Redirect to the get route to display all students
   }).catch(function(err){
       res.status(500).send(err);
   });
 });

//Update a task
app.patch('/:task_id', function(req, res){
    let taskID = req.params.task_id;
  
    //Find the task 
    Task.findByPk(taskID).then(function(result){
        //Check if task was found
        if(result){
            //Update task record
            if (req.body.priority_level) {result.priority_level = req.body.priority_level};
            if (req.body.progress_level) {result.progress_level = req.body.progress_level};
 
            //Save changes to DB
            result.save().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Task record not found');
        }
  
    }).catch(function(err){
        res.status(500).send(err);
    });
  });
  
  

//Delete a task record
app.delete('/:task_id', function(req, res){
    let taskId = req.params.task_id;
  
    //Find the task
    Task.findByPk(taskId).then(function(result){
  
        if(result){
            //Delete task from database
            result.destroy().then(function(){
                res.redirect('/');
            }).catch(function(err){
                res.status(500).send(err);
            });
        }
        else {
            res.status(404).send('Task record not found');
        }
  
    }).catch(function(err){
        res.status(500).send(err);
    });
  });
  


app.listen(3000, function(){
  console.log('Server running on port 3000...');
});
