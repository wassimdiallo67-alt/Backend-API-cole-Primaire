// models/index.js
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Role = require('./Role')(sequelize, DataTypes);
const User = require('./User')(sequelize, DataTypes);
const Student = require('./Student')(sequelize, DataTypes);
const Teacher = require('./Teacher')(sequelize, DataTypes);
const Class = require('./Class')(sequelize, DataTypes);            
const Subject = require('./Subject')(sequelize, DataTypes);
const ClassSubject = require('./ClassSubject')(sequelize, DataTypes);
const Enrollment = require('./Enrollment')(sequelize, DataTypes);
const Grade = require('./Grade')(sequelize, DataTypes);

// Relations Auth
Role.hasMany(User, { foreignKey: { name: 'roleId', allowNull: false } });
User.belongsTo(Role, { foreignKey: 'roleId' });

// Classe principale (titulaire)
Teacher.hasMany(Class, { foreignKey: { name: 'homeroomTeacherId', allowNull: true } });
Class.belongsTo(Teacher, { as: 'homeroomTeacher', foreignKey: 'homeroomTeacherId' });

// Matières enseignées dans une classe (par un enseignant)
Class.belongsToMany(Subject, { through: ClassSubject, foreignKey: 'classId' });
Subject.belongsToMany(Class, { through: ClassSubject, foreignKey: 'subjectId' });
Teacher.hasMany(ClassSubject, { foreignKey: { name: 'teacherId', allowNull: false } });
ClassSubject.belongsTo(Teacher, { foreignKey: 'teacherId' });

// Inscriptions élève → classe
Student.hasMany(Enrollment, { foreignKey: { name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });
Enrollment.belongsTo(Student, { foreignKey: 'studentId' });
Class.hasMany(Enrollment, { foreignKey: { name: 'classId', allowNull: false }, onDelete: 'CASCADE' });
Enrollment.belongsTo(Class, { foreignKey: 'classId' });

// Notes
Student.hasMany(Grade, { foreignKey: { name: 'studentId', allowNull: false }, onDelete: 'CASCADE' });
Grade.belongsTo(Student, { foreignKey: 'studentId' });
Subject.hasMany(Grade, { foreignKey: { name: 'subjectId', allowNull: false }, onDelete: 'CASCADE' });
Grade.belongsTo(Subject, { foreignKey: 'subjectId' });
Class.hasMany(Grade, { foreignKey: { name: 'classId', allowNull: false }, onDelete: 'CASCADE' });
Grade.belongsTo(Class, { foreignKey: 'classId' });

module.exports = {
  sequelize,
  Role, User,
  Student, Teacher, Class, Subject, ClassSubject,
  Enrollment, Grade
};
