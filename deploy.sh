#!/usr/bin/env bash
ng build --prod --aot --output-path=build/prod/
scp -i  ~/Downloads/DevMongoCluster.pem -r build/prod/* ec2-user@54.241.168.25:/usr/share/nginx/html
