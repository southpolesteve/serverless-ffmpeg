# Serverless ffmpeg

## Getting started

1.  Have node installed. At least version 8
2.  Have aws account and setup aws-cli
3.  Have SAM local installed: `npm i -g aws-sam-local`
4.  Create an s3 bucket to use for files
5.  run `node event-setup.js your-s3-bucket`. This will upload `./test.wav` to the bucket and generate `event.json`
6.  run `sam local invoke -e event.json`
7.  See your converted `./test.mp3` in you s3 bucket :)

The function runs with an expected event payload:

```
{
  input: {
    Bucket: 'your-s3-bucket',
    Key: 'file/path/foo.wav'
  },
  output: {
    Bucket: 'your-s3-bucket',
    Key: 'file/path/foo.mp3'
  }
}
```

Prior Art:
https://github.com/binoculars/aws-lambda-ffmpeg

Made for the lovely people at [MUSICat](https://www.musicat.co/)

Made with ❤️ by Steve Faulkner. Available on the [AWS Serverless Application Repository](https://aws.amazon.com/serverless)
