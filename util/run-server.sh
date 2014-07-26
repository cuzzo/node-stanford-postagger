#! /usr/bin/env bash

TAGGER_HOME="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

java -cp ".:$TAGGER_HOME/tagger_server.jar:$TAGGER_HOME/stanford-postagger.jar:$TAGGER_HOME/xmlrpc-1.2-b1.jar" edu.stanford.main.MaxentTaggerServer -model $1 -serverPort $2
