import env from '#start/env'
import AWS from 'aws-sdk'

AWS.config.update({
  accessKeyId: env.get('AWS_ACCESS_KEY'),
  secretAccessKey: env.get('AWS_SECRET_ACCESS_KEY'),
  region: env.get('AWS_REGION'),
})

interface S3UploadResult {
  Location: string
  ETag: string
  Bucket: string
  Key: string
}

export class S3Service {
  private s3: AWS.S3

  constructor() {
    this.s3 = new AWS.S3()
  }

  async upload(fileContent: Buffer, fileName: string, mimeType: string): Promise<S3UploadResult> {
    const params = {
      Bucket: env.get('AWS_S3_BUCKET'),
      Key: fileName,
      Body: fileContent,
      ContentType: mimeType,
      ACL: 'public-read',
    }

    return new Promise((resolve, reject) => {
      this.s3.upload(params, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  async delete(fileName: string): Promise<void> {
    const params = {
      Bucket: env.get('AWS_S3_BUCKET'),
      Key: fileName,
    }

    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
    })
  }

  async getImage(fileName: string): Promise<File> {
    const params = {
      Bucket: env.get('AWS_S3_BUCKET'),
      Key: decodeURIComponent(fileName),
    }

    return new Promise((resolve, reject) => {
      this.s3.getObject(params, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        if (!data.Body) {
          reject(new Error('Image not found'))
        }
        resolve(new File([data.Body], fileName))
      })
    })
  }
}
