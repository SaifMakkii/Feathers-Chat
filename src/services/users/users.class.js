const { Service } = require('feathers-mongodb')

const crypto = require('crypto');

const gravatarUrl = 'https://s.gravatar.com/avatar';
const query = 's=60';

exports.Users = class Users extends Service {
  constructor (options, app) {
    super(options)

    app.get('mongoClient').then(db => {
      this.Model = db.collection('users')
    })
  }

  create(data, params){
    const {email, password, githubId } = data;

    const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

    const avatar = `${gravatarUrl}/${hash}?${query}`;

    const userData = {
      email,
      password,
      githubId,
      avatar
    };

    return super.create(userData, params);
  }
}
