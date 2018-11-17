#ENIGMA
####[ EXTENSIBLE NODE INTERCONNECTION GATEWEAY MANAGEMENT ARCHITECTURE ]
##Node Server Installation
####DESCRIPTION
This package contains the full ENIGMA installation.
___
####USAGE
From the (linux) server terminal.
*SSH PUBLIC KEY*
```
$ ssh-keygen
$ ps -e | grep [s]sh-agent
$ ssh-agent /bin/bash
$ ssh-add ~/.ssh/id_rsa
$ ssh-add -l
$ cat ~/.ssh/id_rsa.pub
```
___
###TO DO
- [ ] Create automatic deployment script for Azure linux vm.
