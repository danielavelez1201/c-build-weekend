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
    var commits = []

    const branchResponse = await axios.request(options)
    var branches = branchResponse.data
    var branchNames = [branches[0].name, branches[1].name, branches[2].name]
    await Promise.all([
        fetch(branches[0].commit.url),
        fetch(branches[1].commit.url),
        fetch(branches[2].commit.url)
    ]).then((async([aa, bb, cc]) => {
        const a = await aa.json();
        const b = await bb.json();
        const c = await cc.json();
        return [a, b, c]
      }).then((response) => {
        res.status(200).send(response)
      })

    )


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