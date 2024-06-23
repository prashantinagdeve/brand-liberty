const Project = require("../modules/projectModules");
const { v4: uuidv4 } = require('uuid');



exports.addProject = async (req, res) => {
  const { domain, category, subcategory, prompt } = req.body;

  // Generate unique special code
  const specialCode = uuidv4();

  // Log the request body
  console.log('Add Project Request Body:', req.body);

  const project = new Project({
      domain,
      category,
      subcategory,
      prompt,
      specialCode // Add the special code to the project document
  });
  try {
      const savedProject = await project.save();
      res.status(200).json({ message: "Project Added", project: savedProject });
  } catch (error) {
      console.error('Error adding project:', error); // Log the actual error
      res.status(500).json({ message: "Server Error" });
  }
};

exports.getProject = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error(error); // Log the actual error
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project Deleted" });
  } catch (error) {
    console.error(error); // Log the actual error
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateProject = async (req, res) => {
    const { id } = req.params;
    const { domain, category, subcategory, prompt, status } = req.body;
  
    // Log the request body
    console.log('Update Project Request Body:', req.body);
  
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        id,
        { domain, category, subcategory, prompt, status },
        { new: true, runValidators: true }
      );
      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }
      res
        .status(200)
        .json({ message: "Project Updated", project: updatedProject });
    } catch (error) {
      console.error('Error updating project:', error); // Log the actual error
      res.status(500).json({ message: "Server Error" });
    }
  };
