const bcrypt = require('bcryptjs');

async function testHash() {
  const hash = "$2b$10$VyBWQf9tikN50uKhpH/y6eCyL4SiqteBSiq9LtIlXTaVN3noqqRlK";
  const isMatch = await bcrypt.compare("test1234", hash);
  console.log("Password match:", isMatch); // Returns `false` → Hash mismatch
}

testHash();