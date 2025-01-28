## Response Headers (Required):

Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers:     *
Access-Control-Allow-Methods:     POST, GET, OPTIONS, PUT, DELETE
Access-Control-Allow-Origin:      *


## Environment Variables (Required):

CF_DNS_RESOLVER_URL:    https://doh.opendns.com/dns-query
CLOUD_PLATFORM:         fastedge
DISABLE_BLOCKLISTS:     true
env:                    production


### Notes:

This branch is the working version we have of dns-resolver in the demo-app

