# #!/usr/bin/env bash
# tar -czf build/build.develop.tar.gz -C build/dev .
# ssh -i  ~/dev/DevMongoCluster.pem ec2-user@54.241.168.25 "tar -C /var/www/devs -xz -f-" < build/build.develop.tar.gz
printf "\n"
printf "___  ___   _   _   _   _   ___  _  _  _  _  ___\n"
printf "|_ _|| __| / \ | \_/ | / \ | __|| |/ \| \| || __|\n"
printf " | | | _| | o || \_/ || o || _| | ( o ) \\ || _| \n"
printf " |_| |___||_n_||_| |_||_n_||___||_|\_/|_|\_||___|\n"
printf "\n"
# if [ $1 ]; then
#   echo 🚧   ---  Building Project [ $1 ]
#   if [ $2 = "build" ] then
#     ng build --environment=$1 --aot --output-path=build/$1/
#   fi
#   echo 🚥   ---  Deploying files
#   scp -i  ~/dev/DevMongoCluster.pem -r build/$1/* ec2-user@54.241.168.25:/var/www/$1.onepagespotlight.com/public_html
# else
#   # if [ $2 = "build" ] then
#   #   echo 🚧   ---  Building Project [ dev ]
#   #   ng build --aot --output-path=build/dev/
#   # fi
#   echo [ DEVELOP ] Deploying files
#   scp -i  ~/dev/DevMongoCluster.pem -r build/dev/* ec2-user@54.241.168.25:/var/www/dev.onepagespotlight.com/public_html
# fi
