[![Build Status](https://travis-ci.org/cfn-modules/lambda-layer.svg?branch=master)](https://travis-ci.org/cfn-modules/lambda-layer)
[![NPM version](https://img.shields.io/npm/v/@cfn-modules/lambda-layer.svg)](https://www.npmjs.com/package/@cfn-modules/lambda-layer)

# cfn-modules: AWS Lambda layer

AWS Lambda layer for the use with Lambda function.

## Install

> Install [Node.js and npm](https://nodejs.org/) first!

```
npm i @cfn-modules/lambda-layer
```

## Usage

```
---
AWSTemplateFormatVersion: '2010-09-09'
Description: 'cfn-modules example'
Resources:
  Layer:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        ContentBucket: 'BucketName' # required
        ContentKey: 'layer.zip' # required
        ContentVersion: '' # optional
        CompatibleRuntimes: '' # optional
      TemplateURL: './node_modules/@cfn-modules/lambda-layer/module.yml'
  Function:
    Type: 'AWS::CloudFormation::Stack'
    Properties:
      Parameters:
        LayerModule: !GetAtt 'Layer.Outputs.StackName' # optional
        ...
      TemplateURL: './node_modules/@cfn-modules/lambda-function/module.yml'
```

## Parameters

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
      <th>Default</th>
      <th>Required?</th>
      <th>Allowed values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>CompatibleRuntimes</td>
      <td>List of compatible runtimes (e.g. nodejs6.10,nodejs8.10)</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
    <tr>
      <td>ContentBucket</td>
      <td>The name of the S3 bucket containing the layer content.</td>
      <td></td>
      <td>yes</td>
      <td></td>
    </tr>
    <tr>
      <td>ContentKey</td>
      <td>The key of the S3 object - a ZIP file - including the layer content.</td>
      <td></td>
      <td>yes</td>
      <td></td>
    </tr>
    <tr>
      <td>ContentVersion</td>
      <td>The version of the S3 object - a ZIP file - including the layer content.</td>
      <td></td>
      <td>no</td>
      <td></td>
    </tr>
  </tbody>
</table>
