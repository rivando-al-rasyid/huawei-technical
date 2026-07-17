#!/bin/bash
# This script is used to clean up files older than 30 days in the home directory.
find ${HOME} -type f -mtime +30 -delete

