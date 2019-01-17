const test = require('ava');
const cfntest = require('@cfn-modules/test');

test('defaults', async t => {
  const bucketStackName = cfntest.stackName();
  const layerStackName = cfntest.stackName();
  const contentKey = 'test.zip';
  const dummyFilePath = `${__dirname}/dummy.zip`;
  let bucketStackOutputs;

  try {
    t.log(await cfntest.createStack(`${__dirname}/node_modules/@cfn-modules/s3-bucket/module.yml`, bucketStackName, {Versioning: 'false'}));
    
    bucketStackOutputs = await cfntest.getStackOutputs(bucketStackName);

    await cfntest.createObject(bucketStackOutputs.Name, contentKey, dummyFilePath);
    
    t.log(await cfntest.createStack(`${__dirname}/node_modules/@cfn-modules/lambda-layer/module.yml`, layerStackName, {
      ContentBucket: bucketStackOutputs.Name,
      ContentKey: contentKey
    }));
    // what could we test here?
  } finally {
    if (bucketStackOutputs) {
      t.log(await cfntest.deleteObject(bucketStackOutputs.Name, contentKey));
    }
    t.log(await cfntest.deleteStack(bucketStackName));
    t.log(await cfntest.deleteStack(layerStackName));
    t.pass();
  }
});
