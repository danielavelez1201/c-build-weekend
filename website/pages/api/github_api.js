import Cors from 'cors'
import axios from "axios";


// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)
  console.log("IN API")

    const options = {
    method: 'GET',
    url: 'https://api.github.com/repos/' + req.query.username + '/' + req.query.repo + '/branches',
    headers: {Accept: 'application/vnd.github.v3+json'}
    };

    await axios.request(options).then(function (response) {
      console.log(response.data);
      res.json(response.data);
    }).catch(function (error) {
      console.error(error);
    }); 

    /* var data = [
      {
        name: 'master',
        commit: {
          sha: '7fd1a60b01f91b314f59955a4e4d4e80d8edf11d',
          url: 'https://api.github.com/repos/octocat/Hello-World/commits/7fd1a60b01f91b314f59955a4e4d4e80d8edf11d'
        },
        protected: false
      },
      {
        name: 'octocat-patch-1',
        commit: {
          sha: 'b1b3f9723831141a31a1a7252a213e216ea76e56',
          url: 'https://api.github.com/repos/octocat/Hello-World/commits/b1b3f9723831141a31a1a7252a213e216ea76e56'
        },
        protected: false
      },
      {
        name: 'test',
        commit: {
          sha: 'b3cbd5bbd7e81436d2eee04537ea2b4c0cad4cdf',
          url: 'https://api.github.com/repos/octocat/Hello-World/commits/b3cbd5bbd7e81436d2eee04537ea2b4c0cad4cdf'
        },
        protected: false
      }
    ]

    res.json(data) */
    /* 
    var branches = branchResponse.data
    var branchNames = [branches[0].name, branches[1].name, branches[2].name]
    await Promise.all([
        fetch(branches[0].commit.url),
        fetch(branches[1].commit.url),
        fetch(branches[2].commit.url)
    ]).then(data => {
        res.status(200).send(data)
    }) */


    /* var commitList = []

    for(var i=0; i < data.length; i++) {
        commitList.push({message: data[i].commit.message, url: data[i].html_url})
    }
        var branch = branchNames.shift()
        commits.push({branch: branch, commitList: commitList})
        return
    }).then(function () {
        console.log("returning")
 */
    
    }

    



export default handler