const bcrypt = require('bcryptjs');

async function generatePasswords() {
  const passwords = {
    admin: 'admin123',
    user: 'user123'
  };

  console.log('Generating password hashes...\n');

  for (const [username, password] of Object.entries(passwords)) {
    const hash = await bcrypt.hash(password, 10);
    console.log(`${username}: ${password} -> ${hash}`);
  }

  console.log('\nUse these hashes in your database INSERT statements.');
}

generatePasswords().catch(console.error);