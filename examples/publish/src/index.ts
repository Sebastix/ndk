import "websocket-polyfill";
import NDK, { NDKEvent, NDKRelaySet, NDKRelay, NDKNip07Signer } from "@nostr-dev-kit/ndk";

const nip07signer = new NDKNip07Signer()
const ndk = new NDK({
  explicitRelayUrls: [
    "wss://pablof7z.nostr1.com",
    "wss://offchain.pub",
    "wss://relay.f7z.io",
    "wss://relay.damus.io",
    "wss://relay.snort.social",
    "wss://offchain.pub",
    "wss://nostr.mom",
    "wss://nostr-pub.wellorder.net",
    "wss://purplepag.es",
    "wss://brb.io",
  ],
  enableOutboxModel: false,
});
ndk.signer = nip07signer
await ndk.connect()

// Create an event,
const event = new NDKEvent(ndk)
event.kind = 1 // text note
event.created_at = Math.floor(Date.now() / 1000)
event.content = 'This is a example note published by the NDK example'
event.tags = []

// Sign event,
event.sign(ndk)

// Last checks.
event.toNostrEvent()

// Publish the event to a set of relays.
const toRelays = new NDKRelaySet(
  new Set([
    new NDKRelay('wss://khatru.nostver.se'),
    new NDKRelay('wss://nostr.sebastix.dev')
  ]),
  ndk
)
// Let's execute a dry-run first for publishing an event.
// Try to connect to each relay first.

event.publish(toRelays, 5000)
