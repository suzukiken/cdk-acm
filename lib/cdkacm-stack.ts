import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager'
import * as route53 from '@aws-cdk/aws-route53'

export class CdkacmStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domain = this.node.tryGetContext('domain')
    const tokyo_exportname = this.node.tryGetContext('acmarn-exportname');
    const virginia_exportname = this.node.tryGetContext('crossregion-acmarn-exportname');
    
    const zone = route53.HostedZone.fromLookup(this, 'zone', {
      domainName: domain
    })
    
    const tokyo_certificate = new acm.DnsValidatedCertificate(this, 'tokyo_certificate', {
      domainName: '*.' + domain,
      hostedZone: zone,
      region: 'ap-northeast-1',
    })
    
    const virginia_certificate = new acm.DnsValidatedCertificate(this, 'crossregion_certificate', {
      domainName: '*.' + domain,
      hostedZone: zone,
      region: 'us-east-1',
    })
    
    new cdk.CfnOutput(this, 'tokyo_certificatearn_out', {
      value: tokyo_certificate.certificateArn,
      exportName: tokyo_exportname
    })
    
    new cdk.CfnOutput(this, 'virginia_certificatearn_out', {
      value: virginia_certificate.certificateArn,
      exportName: virginia_exportname
    })

  }
}
