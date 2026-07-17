#!/bin/bash
# This script is used to clean up files older than 30 days in the "files" directory.
find ${PWD}/files/ -type f -mtime +30 -delete