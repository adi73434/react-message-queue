

## very simple dumb API
No auth, user accounts, nothing. At least not yet



### insertMessage
- allow taking in data, of format string + id
- insert data into db



### fetchAllMessages
- take a list of message IDs the client already has
- send back an assoc array of all messages the client does not already have
