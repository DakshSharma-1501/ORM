const express = require('express');
const { PrismaClient } = require('@prisma/client');

const server = express();
server.use(express.json());

const prisma = new PrismaClient();

server.get('/' , async(req ,res)=>{
    res.send('running')
})

server.get('/User' , async(req , res)=>{
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to retrieve users.' });
      }
})

server.post('/User', async (req, res) => {
  try {
    const newUser = await prisma.User.create({
      data: {
        username : req.body.username
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create user.' });
  }
});


 
//update user
server.patch('/User/:id', async (req, res) => {
    try{
      const updatedUser = await prisma.User.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
            username : req.body.username
          },
      });
      res.status(200).json(updatedUser);
    }
    catch(error){
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to update user.' });
    }
  })
  
  //delete user
  server.delete('/User/:id', async (req, res) => {
    try{
      const deletedUser = await prisma.User.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json(deletedUser);
    }
    catch(error){
      console.error('Error:', error);
      res.status(500).json({ error: 'Failed to delete user.' });
    }
  })
  


server.listen(3000, () => {
  console.log('Server started on port 3000');
});
