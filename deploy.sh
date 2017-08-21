#!/usr/bin/env bash
ng build --env=prod --output-path=build/prod/
scp -i ~/dev/DevMongoCluster.pem -r build/prod/* ec2-user@54.183.144.207:/usr/share/nginx/html
