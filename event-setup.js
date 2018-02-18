if (!process.argv[2]) {
  throw new Error('Usage: node event-setup.js your-s3-bucket-name')
}

const AWS = require('aws-sdk')
const crypto = require('crypto')
const fs = require('fs')
const util = require('util')
const writeFile = util.promisify(fs.writeFile)

const prefix = crypto.randomBytes(4).toString('base64')

const Bucket = process.argv[2]
const s3 = new AWS.S3({ params: { Bucket } })

const file = fs.readFileSync('./test.wav')

async function main() {
  const inputKey = `${prefix}/test.wav`
  const outputKey = `${prefix}/test.mp3`
  console.log(`Uploading ./test.wav to ${Bucket}/${inputKey}`)
  await s3.putObject({ Body: file, Key: inputKey }).promise()

  const event = {
    input: {
      Bucket,
      Key: inputKey
    },
    output: {
      Bucket,
      Key: outputKey
    }
  }

  await writeFile('./event.json', JSON.stringify(event)).catch(e =>
    console.log(e)
  )
}

main().then(
  () => process.exit(0),
  err => {
    console.log(err)
    process.exit(1)
  }
)
