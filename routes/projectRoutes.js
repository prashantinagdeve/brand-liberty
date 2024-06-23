
const router = require('express').Router();
const {addProject,getProject,deleteProject,updateProject} = require('../controllers/project')

router 
      .post('/addproject', addProject)
      .get('/getproject', getProject)
      .delete('/deleteprojects/:id', deleteProject)
      .put('/updateprojects/:id', updateProject)
      

module.exports = router