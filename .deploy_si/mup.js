module.exports = {
  servers: {
    one: {
      host: '104.236.37.13',
      username: 'root',
      pem: "/Users/marco/.ssh/id_rsa"
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'process',
    port: 3023,
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      ROOT_URL: 'https://process.schwartzindustries.com',
      MONGO_URL: 'mongodb://localhost/meteor',
      PORT: 3023,
      METEOR_SKIP_NPM_REBUILD: 1
    },

    docker: {
      image:'abernix/meteord:base',
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};