#!/bin/sh

EVENT="${1:-unknown}"
MESSAGE="${2:-OpenCode needs attention}"
PROJECT="${3:-}"

case "$EVENT" in
  complete)
    TITLE="✅ OpenCode Done"
    SOUND="bright"
    ;;
  permission|question)
    TITLE="⚠️ OpenCode Needs Input"
    SOUND="bugle"
    ;;
  error)
    TITLE="❌ OpenCode Error"
    SOUND="siren"
    ;;
  plan_exit)
    TITLE="📝 OpenCode Plan Ready"
    SOUND="bright"
    ;;
  *)
    TITLE="OpenCode"
    SOUND="pushover"
    ;;
esac

if [ -n "$PROJECT" ]; then
  TITLE="$TITLE — $PROJECT"
fi

exec /Users/ton/bin/pushover-notify "$TITLE" "$MESSAGE" "$SOUND"
