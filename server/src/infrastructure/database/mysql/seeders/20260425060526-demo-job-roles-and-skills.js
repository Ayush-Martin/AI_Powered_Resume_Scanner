'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Insert Job Roles
    await queryInterface.bulkInsert('job_roles', [
      { id: 1, title: 'Backend Developer', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, title: 'Frontend Developer', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, title: 'Fullstack Engineer', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // 2. Insert Skills
    await queryInterface.bulkInsert('skills', [
      { id: 1, name: 'Node.js', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, name: 'TypeScript', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, name: 'React', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: 'MySQL', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: 'CSS', createdAt: new Date(), updatedAt: new Date() }
    ]);

    // 3. Link them in the Junction Table (job_role_skills)
    await queryInterface.bulkInsert('job_role_skills', [
      // Backend Developer: Node, TS, MySQL
      { jobRoleId: 1, skillId: 1, createdAt: new Date(), updatedAt: new Date() },
      { jobRoleId: 1, skillId: 2, createdAt: new Date(), updatedAt: new Date() },
      { jobRoleId: 1, skillId: 4, createdAt: new Date(), updatedAt: new Date() },

      // Frontend Developer: React, TS, CSS
      { jobRoleId: 2, skillId: 2, createdAt: new Date(), updatedAt: new Date() },
      { jobRoleId: 2, skillId: 3, createdAt: new Date(), updatedAt: new Date() },
      { jobRoleId: 2, skillId: 5, createdAt: new Date(), updatedAt: new Date() },

      // Fullstack: All of the above
      { jobRoleId: 3, skillId: 1, createdAt: new Date(), updatedAt: new Date() },
      { jobRoleId: 3, skillId: 3, createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down(queryInterface, Sequelize) {
    // Delete in reverse order
    await queryInterface.bulkDelete('job_role_skills', null, {});
    await queryInterface.bulkDelete('skills', null, {});
    await queryInterface.bulkDelete('job_roles', null, {});
  }
};