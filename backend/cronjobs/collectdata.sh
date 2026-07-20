# collect.sh - fix
TARGET_DIR="/home/cron"

mkdir -p "$TARGET_DIR"

TIMESTAMP=$(TZ="Asia/Jakarta" date +"%m%d%Y_%H.%M")
FILE="$TARGET_DIR/cron_${TIMESTAMP}.csv"
TMP=$(mktemp)
if ! curl -sf --connect-timeout 5 --max-time 15 https://jsonplaceholder.typicode.com/users -o "$TMP"; then
  echo "gagal fetch" >&2; rm -f "$TMP"; exit 1; fi
jq -r '(["id","name","email"]), (.[] | [.id,.name,.email]) | @csv' "$TMP" > "$FILE"
rm -f "$TMP"
echo "saved $FILE"