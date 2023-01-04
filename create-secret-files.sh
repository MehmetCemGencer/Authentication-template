#!/bin/bash
echo "Creating secret files"
touch session_secret.txt \
    db_url.txt \
    db_port.txt \
    db_username.txt \
    db_password.txt \
    db_name.txt \
    redis_url.txt \
    redis_port.txt
echo "Files are created"