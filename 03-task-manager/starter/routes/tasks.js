const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTasks,
  getTasks,
  deleteTasks,
  updateTasks,
} = require("../controllers/task");

router.route("/").get(getAllTasks).post(createTasks);

router.route("/:id").get(getTasks).delete(deleteTasks).patch(updateTasks);

module.exports = router;
