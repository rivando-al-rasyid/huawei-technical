# declare the cron job schedule use sh 
#!/bin/bash

# get current date and time for filename
DATE=$(date +"%m%d%Y")
TIME=$(date +"%H.%M")

# create a filename with the current date and time on home directory
FILENAME="${HOME}/cron_${DATE}_${TIME}.csv"

#get the resource URL
RESOURCE_URL="localhost:3000/user/list" 

# Collect data from the resource URL and save it to the file
curl -s "$RESOURCE_URL" -o "$FILENAME"

