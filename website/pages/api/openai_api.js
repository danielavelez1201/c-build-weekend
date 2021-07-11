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

  const text = req.query.text.slice(0, 5)
  console.log(text)

  const apiKey = process.env.OPENAI_API_KEY
  const options = {
    method: 'POST',
    url: 'https://api.openai.com/v1/engines/davinci/completions',
    headers: {
      'Content-Type': 'application/json',
      Authorization: apiKey,
    },
    data: {prompt: text + ' tl;dr:', max_tokens: 1}
  };
  
  axios.request(options).then(function (response) {
    res.json(response.data);
  }).catch(function (error) {
    console.error(error);
  });
  
}

export default handler