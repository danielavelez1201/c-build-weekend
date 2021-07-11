import Cors from 'cors'
import axios from "axios";
import { time } from 'console';


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

  const options1 = {
    method: 'GET',
    url: url,
    headers: {
      'Notion-Version': '2021-05-13',
      Authorization: 'Bearer secret_wgPV8akvo0FRjsUofyfFZ4dYfRYocDLVmGEUsNd8qSx'
    }
  };

  
  const options = {
    method: 'GET',
    url: 'https://api.notion.com/v1/blocks/90760907-b2df-4aa8-b236-42f139b542e7/children',
    params: {page_size: '100'},
    headers: {
      'Notion-Version': '2021-05-13',
      Authorization: 'Bearer secret_wgPV8akvo0FRjsUofyfFZ4dYfRYocDLVmGEUsNd8qSx'
    }
  };


  axios.request(options).then(function (response) {
    var doc = response.data.results
    var text = ""
    var latest = []

    for(let i = 0; i<doc.length; i++) {
      var item = doc[i]

      var item_text = ""
      console.log(item.type)
      if(item.type === "heading_1") {
        if (item.heading_1.text.length > 0) {
          item_text = item.heading_1.text[0].text.content
        }
      }
      if(item.type === "heading_2") {
        if (item.heading_2.text.length > 0) {
          item_text = item.heading_2.text[0].text.content
        }
      }
      if(item.type === "heading_3") {
        if (item.heading_3.text.length > 0) {
          item_text = item.heading_3.text[0].text.content
        }
      }
      if(item.type === "bulleted_list_item") {
        if (item.bulleted_list_item.text.length > 0) {
          item_text = item.bulleted_list_item.text[0].text.content
        }
      }
      if(item.type === "numbered_list_item") {
        if (item.numbered_list_item.text.length > 0) {
          item_text = item.numbered_list_item.text[0].text.content
        }
      }
      if(item.type === "paragraph") {
        if (item.paragraph.text.length > 0) {
          item_text = item.paragraph.text[0].text.content
        }
      }


      text += "\n" + item_text + "\n"

      var item_time = Date.parse(item.last_edited_time)
      var item_object = {timestamp: item_time, text : item_text}

      if (i < 3) {
        latest.push(item_object)
        latest.sort()
      }
      else {
        if (item_time > latest[0].timestamp) {
          var new_latest = latest.unshift(item_object)
        }
        else if (item_time > latest[1].timestamp) {
          var new_latest = latest.slice(0, 1)
          var end_slice = latest.slice(2, 3)
          new_latest.push(item_object)
          new_latest.concat(end_slice)
        }
        else if (item_time > latest[2].timestamp) {
          var new_latest = latest.slice(0, 2)
          new_latest.push(item_object)
        }
        else {
          var new_latest = latest
        }  
      }
    }

    res.status(200).json({summary: text, latest: new_latest})
}).catch(function (error) {
    console.error(error);
});
  
}

export default handler