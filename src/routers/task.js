const express = require("express");
const Task = require("../models/task");
const auth=require('../middleware/auth');
const router = express.Router();

router.post("/tasks", auth,async (req, res) => {
  const task= new Task({
    ...req.body,
    owner:req.user._id
  })
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/tasks",auth, async (req, res) => {
  // if(req.query.completed){
  //   const match=(req.query.completed==='true');
  //   try {
  //     const task = await Task.find({owner:req.user._id,completed:match});
  //     res.send(task);
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
  // }else{
  //   try {
  //     const task = await Task.find({owner:req.user._id});
  //     res.send(task);
  //   } catch (e) {
  //     res.status(500).send(e);
  //   }
  // }

  const sort={};
  const match={};
  if(req.query.completed){
    match.completed=(req.query.completed==='true');
  }
  if(req.query.sortBy){
    const parts=req.query.sortBy.split(':');
    sort[parts[0]]=parts[1]==='asc'?1:-1;
  }
  try{
    await req.user.populate([{
      path:'tasks',
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),
        sort
      }
    }])
    res.send(req.user.tasks);
  }catch(e){
    res.status(500).send(e);
  }
});

router.get("/tasks/:id",auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findOne({_id,owner:req.user._id});
    if (!task) {
      return res.status(404).send();
    }
    return res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/tasks/:id",auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "invalid update" });
  }
  try {
    const task=await Task.findOne({_id:req.params.id,owner:req.user._id});
    if (!task) {
      return res.status(404).send();
    }
    updates.forEach((update)=> task[update]=req.body[update]);
    await task.save();
    res.status(200).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", auth,async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
