import * as cdk from '@aws-cdk/core';
import * as acm from '@aws-cdk/aws-certificatemanager'
import * as route53 from '@aws-cdk/aws-route53'

export class CdkacmStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const domain = this.node.tryGetContext('domain')
    const exportname = this.node.tryGetContext('acmarn-exportname');
    const crossregion_exportname = this.node.tryGetContext('crossregion-acmarn-exportname');
    
    const zone = route53.HostedZone.fromLookup(this, 'zone', {
      domainName: domain
    })

    const certificate = new acm.Certificate(this, 'certificate', {
      domainName: '*.' + domain,
      validation: acm.CertificateValidation.fromDns(zone),
    })
    
    const crossregion_certificate = new acm.DnsValidatedCertificate(this, 'crossregion_certificate', {
      domainName: '*.' + domain,
      hostedZone: zone,
      region: 'us-east-1',
    })
    
    new cdk.CfnOutput(this, 'exportname_out', {
      value: certificate.certificateArn,
      exportName: exportname
    })
    
    new cdk.CfnOutput(this, 'crossregion_exportname_out', {
      value: crossregion_certificate.certificateArn,
      exportName: crossregion_exportname
    })

  }
}
