import Project from '../models/projects.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();

    const projectsWithImageUrls = projects.map((project) => ({
      ...project.dataValues,
      image: `${process.env.SERVER_URL}/images/${project.image}`,
    }));

    res.status(200).json(projectsWithImageUrls);
  } catch (e) {
    console.error('Error fetching projects:', e);
    res.status(500).json({
      message: 'An error occurred while fetching projects.',
      error: e.message,
    });
  }
};
