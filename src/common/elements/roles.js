let roles;

if (
  !process.env.RI_ENV ||
  (process.env.RI_ENV && process.env.RI_ENV == 'development')
) {
  roles = ['user', 'admin', 'superadmin', 'regionadmin', 'recipeadmin'];
} else if (process.env.RI_ENV == 'production_mycook') {
  roles = [
    'user',
    'operator',
    'factory',
    'machine',
    'admin',
    'superadmin',
    'regionadmin',
    'recipeadmin',
  ];
} else {
  roles = ['user', 'admin', 'regionadmin', 'recipeadmin'];
}

module.exports = roles;
