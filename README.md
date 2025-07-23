# setup-ossutil2

aliyun ossutil2 setup action

## Env

| name                  | description                                                | required |
| --------------------- | ---------------------------------------------------------- | -------- |
| OSS_ACCESS_KEY_ID     | AccessKeyID while access oss                               | yes      |
| OSS_ACCESS_KEY_SECRET | AccessKeySecret while access oss                           | yes      |
| OSS_SESSION_TOKEN     | STSToken while access oss                                  | no       |
| OSS_ROLE_ARN          | Specifies the ARN of role                                  | no       |
| OSS_ROLE_SESSION_NAME | Specifies the session name                                 | no       |
| OSS_REGION            | The region in which the bucket is located                  | yes      |
| OSS_ENDPOINT          | The domain names that other services can use to access OSS | no       |

## Example

```yaml
env:
  OSS_ACCESS_KEY_ID: ${{ secrets.OSS_ACCESS_KEY_ID }}
  OSS_ACCESS_KEY_SECRET: ${{ secrets.OSS_ACCESS_KEY_SECRET }}
  OSS_REGION: cn-beijing

jobs:
  upload-oss:
    name: Upload to OSS
    runs-on: ubuntu-latest

    steps:
      - name: setup ossutil2
        uses: rogerogers/setup-ossutil2@v1

      - name: upload
        run: ossutil cp -r -u oss://your-bucket-name ./dist
```
