import projectsData from '../data/projects-data.js';

export const getAllProjects = async (req, res) => {
  try {
    const projects = projectsData.map((project) => ({
      ...project,
      image: `${process.env.SERVER_URL}/images/${project.image}`,
    }));

    res.status(200).json(projects);
  } catch (e) {
    console.error('Error fetching projects:', e);

    res.status(500).json({
      message: 'An error occurred while fetching projects.',
      error: e.message,
    });
  }
};
