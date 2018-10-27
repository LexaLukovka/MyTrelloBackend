const path = require('path')

class UploadController {
  async store(request, response) {

    function generateName(extension) {
      return `${new Date().getTime()}${extension}`
    }

    let uploadFile = request.files.file
    const name = generateName(request.files.file.name)

    const pathUpload = path.resolve('./uploads')

    uploadFile.mv(
      `${pathUpload}/${name}`,
      function (err) {
        if (err) {
          return response.status(500).send(err)
        }

        response.json({ url: `/uploads/${name}` })
      },
    )

  }
}

module.exports = new UploadController()
