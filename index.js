const { spawn } = require('child_process')
const AWS = require('aws-sdk')
const s3 = new AWS.S3()

exports.handler = function(event, context, callback) {
  const { input, output } = event

  const readStream = s3.getObject(input).createReadStream()

  const ffmpeg = spawn('./bin/ffmpeg', [
    '-f',
    'wav',
    '-i',
    'pipe:0',
    '-f',
    'mp3',
    'pipe:1'
  ])

  readStream.pipe(ffmpeg.stdin)
  ffmpeg.stderr.on('data', data => console.log(data.toString()))

  s3.upload({ ...output, Body: ffmpeg.stdout }, (err, res) =>
    console.log(err, res)
  )
}
