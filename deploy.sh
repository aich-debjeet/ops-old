# #!/usr/bin/env bash
# tar -czf build/build.develop.tar.gz -C build/dev .

# zsh ./stage.sh
printf "\n"
printf " ___  ___   _   _   _   _   ___  _  _  _  _  ___\n"
printf "|_ _|| __| / \ | \_/ | / \ | __|| |/ \| \| || __|\n"
printf " | | | _| | o || \_/ || o || _| | ( o ) \\ || _| \n"
printf " |_| |___||_n_||_| |_||_n_||___||_|\_/|_|\_||___|\n"
printf "\n"

pem_path="~/Downloads/DevMongoCluster.pem"

printf 'Where do you want to deploy'
printf '\n ------ \n'
printf '\n1. dev'
printf '\n2. dev2'
printf '\n3. staging'
printf '\n4. production [ orappalle? ] \n'
printf '\n ~ Team Aeione \n'

read DISTR

case $DISTR in
     1)
          echo "🚧   ---  Building Project  [ dev ]"
          ng build --aot --output-path=build/dev/
          echo "🚧   ---  Deploying Files   [ dev ]"
          scp -i  $pem_path -r build/dev/* ec2-user@54.241.168.25:/var/www/dev.onepagespotlight.com/public_html
          ;;
    2)
          echo "🚧   ---  Building Project  [ dev2 ]"
          ng build --environment=dev2 --aot --output-path=build/dev2/
          echo "🚧   ---  Deploying Files   [ dev2 ]"
          scp -i  $pem_path -r build/dev2/* ec2-user@54.241.168.25:/var/www/dev2.onepagespotlight.com/public_html
          ;;
     3)
          echo "🚧   ---  Building Project  [ staging ]"
          ng build --environment=staging --aot --output-path=build/staging/
          echo "🚧   ---  Deploying Files   [ staging ]"
          scp -i  $pem_path -r build/staging/* ec2-user@54.241.168.25:/var/www/stg.onepagespotlight.com/public_html
          ;;
     4)
          echo "🚧   ---  Building Project  [ production ]"
          ng build --prod --aot --output-path=build/prod/
          echo "🚧   ---  Deploying Files   [ production ]"
          scp -i  $pem_path -r build/prod/* ec2-user@54.241.168.25:/var/www/onepagespotlight.com/public_html
          ;;
     *)
          echo "Not really an option"
          ;;
esac

# if [ $1 ]; then
#   echo 🚧   ---  Building Project [ $1 ]
#   if [ $2 = "build" ] then
#     ng build --environment=$1 --aot --output-path=build/$1/
#   fi
#   echo 🚥   ---  Deploying files
#   # scp -i  ~/dev/DevMongoCluster.pem -r build/$1/* ec2-user@54.241.168.25:/var/www/$1.onepagespotlight.com/public_html
# else
#   # if [ $2 = "build" ] then
#   echo 🚧   ---  Building Project [ dev ]
#   ng build --aot --output-path=build/dev/
#   # fi
#   echo [ DEVELOP ] Deploying files
#   # scp -i  ~/dev/DevMongoCluster.pem -r build/dev/* ec2-user@54.241.168.25:/var/www/dev.onepagespotlight.com/public_html
# fi
