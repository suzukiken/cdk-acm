+++
title = "Certificate Manager"
date = "2021-04-26"
tags = ["Certificate Manager", "ACM"]
+++

Certificate ManagerでワイルドカードのSSL証明書を生成して、いくつかのリージョンでDNSバリデーションするようにした。
証明書のバリデーションにはDNSとEmailとあるけど、Route 53を使っている場合は、DNSレコードの登録からバリデーションまでをCDKのコードだけで自動で処理してくれるので便利。

[Githubのリポジトリ](https://github.com/suzukiken/cdkacm)