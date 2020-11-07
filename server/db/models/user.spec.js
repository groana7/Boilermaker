const { expect } = require('chai');
const { db, User } = require('..');

describe('Testing User model', () => {
  beforeEach(() => db.sync({ force: true }));

  it('checks for the correct password', async () => {
    const user = await User.create({ username: 'harry', password: 'hello' });
    expect(user.correctPassword('hello')).to.be.equal(true);
  });
});
