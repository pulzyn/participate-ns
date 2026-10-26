# Participate vocabulary

JSON-LD context for the Participate protocol: the terms a Participate server
uses in the ActivityPub ticket documents it publishes.

- Context IRI: `https://w3id.org/participate/ns`
- Term IRIs: `https://w3id.org/participate/ns#<term>`, for example
  `https://w3id.org/participate/ns#status`
- This copy: <https://pulzyn.github.io/participate-ns/ns.jsonld>

A ticket document references it next to ActivityStreams:

```json
"@context": [
  "https://www.w3.org/ns/activitystreams",
  "https://w3id.org/participate/ns"
]
```

`isResolved`, `resolved` and `resolvedBy` map to the ForgeFed terms
(`https://forgefed.org/ns#`). They are hints derived from `status`, which is
authoritative.

Every Participate instance also serves the same document at
`/participate/ns`, so a peer never depends on this host or on w3id.org.

The w3id.org identifier redirects here; when the project moves to its own
domain, only the redirect changes and no term IRI does.

CI validates `ns.jsonld` on every pull request. Context changes are additive
only; a change that alters meaning is published as a new versioned file served
at `https://w3id.org/participate/ns/v<N>`, while `ns` keeps its current content.

## Licence

The vocabulary is dedicated to the public domain under
[CC0 1.0](LICENSE), so any implementation can reuse it.
