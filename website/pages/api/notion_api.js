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

  const url = 'https://api.notion.com/v1/pages/' + req.query.src

  const options = {
    method: 'GET',
    url: url,
    headers: {
      'Notion-Version': '2021-05-13',
      Authorization: 'Bearer secret_wgPV8akvo0FRjsUofyfFZ4dYfRYocDLVmGEUsNd8qSx'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data);
}).catch(function (error) {
    console.error(error);
});
  
}

export default handler