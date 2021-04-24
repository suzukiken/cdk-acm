#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { CdkacmStack } from '../lib/cdkacm-stack';

const app = new cdk.App();
new CdkacmStack(app, 'CdkacmStack', {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION }
});
