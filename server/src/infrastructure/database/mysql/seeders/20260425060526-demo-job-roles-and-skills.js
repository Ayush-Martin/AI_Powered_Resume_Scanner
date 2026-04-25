'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // 1. Comprehensive Job Roles
    const jobRoles = [
      { id: 1, title: 'Senior MERN Stack Developer', createdAt: now, updatedAt: now },
      { id: 2, title: 'Python Backend Engineer (Django/FastAPI)', createdAt: now, updatedAt: now },
      { id: 3, title: 'AI/ML Engineer', createdAt: now, updatedAt: now },
      { id: 4, title: 'DevOps & Cloud Architect', createdAt: now, updatedAt: now },
      { id: 5, title: 'Senior Frontend Engineer (React/Next.js)', createdAt: now, updatedAt: now },
      { id: 6, title: 'Data Scientist', createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('job_roles', jobRoles);

    // 2. Comprehensive Skills (Grouped for clarity)
    const skills = [
      // Web & Backend
      { id: 1, name: 'Node.js', createdAt: now, updatedAt: now },
      { id: 2, name: 'Express.js', createdAt: now, updatedAt: now },
      { id: 3, name: 'TypeScript', createdAt: now, updatedAt: now },
      { id: 4, name: 'React.js', createdAt: now, updatedAt: now },
      { id: 5, name: 'Next.js', createdAt: now, updatedAt: now },
      { id: 6, name: 'Python', createdAt: now, updatedAt: now },
      { id: 7, name: 'Django', createdAt: now, updatedAt: now },
      { id: 8, name: 'FastAPI', createdAt: now, updatedAt: now },
      
      // AI / Data Science
      { id: 9, name: 'PyTorch', createdAt: now, updatedAt: now },
      { id: 10, name: 'TensorFlow', createdAt: now, updatedAt: now },
      { id: 11, name: 'Scikit-learn', createdAt: now, updatedAt: now },
      { id: 12, name: 'Natural Language Processing (NLP)', createdAt: now, updatedAt: now },
      { id: 13, name: 'Large Language Models (LLMs)', createdAt: now, updatedAt: now },
      
      // Database & Cloud
      { id: 14, name: 'PostgreSQL', createdAt: now, updatedAt: now },
      { id: 15, name: 'MongoDB', createdAt: now, updatedAt: now },
      { id: 16, name: 'Redis', createdAt: now, updatedAt: now },
      { id: 17, name: 'Docker', createdAt: now, updatedAt: now },
      { id: 18, name: 'Kubernetes', createdAt: now, updatedAt: now },
      { id: 19, name: 'AWS (S3, EC2, Lambda)', createdAt: now, updatedAt: now },
      { id: 20, name: 'Terraform', createdAt: now, updatedAt: now },
      
      // Architecture & Testing
      { id: 21, name: 'Clean Architecture', createdAt: now, updatedAt: now },
      { id: 22, name: 'Microservices', createdAt: now, updatedAt: now },
      { id: 23, name: 'Unit Testing (Jest/Pytest)', createdAt: now, updatedAt: now }
    ];

    await queryInterface.bulkInsert('skills', skills);

    // 3. Mapping Junction Table (Linking Roles to Skills)
    const roleSkillMappings = [
      // MERN Stack Developer
      { jobRoleId: 1, skillId: 1, createdAt: now, updatedAt: now }, // Node
      { jobRoleId: 1, skillId: 2, createdAt: now, updatedAt: now }, // Express
      { jobRoleId: 1, skillId: 3, createdAt: now, updatedAt: now }, // TS
      { jobRoleId: 1, skillId: 4, createdAt: now, updatedAt: now }, // React
      { jobRoleId: 1, skillId: 15, createdAt: now, updatedAt: now }, // Mongo
      { jobRoleId: 1, skillId: 21, createdAt: now, updatedAt: now }, // Clean Arch

      // Python Backend Engineer
      { jobRoleId: 2, skillId: 6, createdAt: now, updatedAt: now }, // Python
      { jobRoleId: 2, skillId: 7, createdAt: now, updatedAt: now }, // Django
      { jobRoleId: 2, skillId: 8, createdAt: now, updatedAt: now }, // FastAPI
      { jobRoleId: 2, skillId: 14, createdAt: now, updatedAt: now }, // Postgres
      { jobRoleId: 2, skillId: 22, createdAt: now, updatedAt: now }, // Microservices

      // AI/ML Engineer
      { jobRoleId: 3, skillId: 6, createdAt: now, updatedAt: now }, // Python
      { jobRoleId: 3, skillId: 9, createdAt: now, updatedAt: now }, // PyTorch
      { jobRoleId: 3, skillId: 12, createdAt: now, updatedAt: now }, // NLP
      { jobRoleId: 3, skillId: 13, createdAt: now, updatedAt: now }, // LLMs
      { jobRoleId: 3, skillId: 17, createdAt: now, updatedAt: now }, // Docker

      // DevOps & Cloud
      { jobRoleId: 4, skillId: 17, createdAt: now, updatedAt: now }, // Docker
      { jobRoleId: 4, skillId: 18, createdAt: now, updatedAt: now }, // K8s
      { jobRoleId: 4, skillId: 19, createdAt: now, updatedAt: now }, // AWS
      { jobRoleId: 4, skillId: 20, createdAt: now, updatedAt: now }, // Terraform

      // Senior Frontend
      { jobRoleId: 5, skillId: 3, createdAt: now, updatedAt: now }, // TS
      { jobRoleId: 5, skillId: 4, createdAt: now, updatedAt: now }, // React
      { jobRoleId: 5, skillId: 5, createdAt: now, updatedAt: now }, // Next
      { jobRoleId: 5, skillId: 16, createdAt: now, updatedAt: now }, // Redis
      { jobRoleId: 5, skillId: 23, createdAt: now, updatedAt: now }  // Testing
    ];

    await queryInterface.bulkInsert('job_role_skills', roleSkillMappings);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('job_role_skills', null, {});
    await queryInterface.bulkDelete('skills', null, {});
    await queryInterface.bulkDelete('job_roles', null, {});
  }
};