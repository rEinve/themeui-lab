#!/usr/bin/env bash

set -euo pipefail

release_version="${1:?Usage: deploy/release-themeui.sh vX.Y.Z}"

if [[ ! "$release_version" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "Release version must be vX.Y.Z" >&2
  exit 1
fi

readonly server="ubuntu@57.131.131.51"
readonly site_root="/var/www/themeui.intelliweblab.com"
readonly release_root="$site_root/releases/$release_version"
readonly build_root="/Users/mac/www/themeui-lab"
readonly ssh_command="ssh -o BatchMode=yes -o ConnectTimeout=10 -o ServerAliveInterval=5 -o ServerAliveCountMax=1"

npm run build

$ssh_command "$server" "sudo install -d -o ubuntu -g www-data -m 0755 '$release_root'"
rsync -az --delete --chmod=Du=rwx,Dgo=rx,Fu=rw,Fgo=r -e "$ssh_command" "$build_root/" "$server:$release_root/"
$ssh_command "$server" "sudo ln -s 'releases/$release_version' '$site_root/current.next' && sudo mv -Tf '$site_root/current.next' '$site_root/current'"
