

# Design (idea 2)


## Common
- `messageItem` comonent that is styled to fit a message item.


## Features



### sender
This will act as the sender's display and provide an ability to cancel sending messages. Messages sent will be removed and not shown in the middle ("sender") display.

- allow string data entry
- save all entered data to own store
- wait 5 seconds and allow user to remove the item before then
- if 5 seconds passes, dispatch data to nodejs with `fetch()`
- dispatched data shall include a ID that allows chronological sorting. Just use a non-persistent ID that starts from 0 whenever page reloads.
- if server replies all is good, send data to `sentLog` and remove from this store



### sentLog
Because I don't have the time to overengineer this properly, the sender will only be able to see messages they sent via this auxiliary component. This doesn't keep in sync with the server and is just here for display purposes.

This doesn not persist between refreshes.

- allow receiving data with id/string
- render message items based on stored data
- initial state never loads anything
- data never expires



### receiver
This will act as the "real" redux store of a recipient.

- On a loop, check against the server for updates
- Whenever server has new data, fetch it all
- render message items based on what's in this store
- dispatch a notification 
- initial state is fetch from server



# Organisation idea 1



## Components



### message entry
- message entry box
- enter or lmb on button to "send"
- send data to redux store `messageQueue`



### message display
- left display based on `receivedMessages`
- middle display based on `messageQueue`
- right display based on `



#### message item
- display message txt based on message data in `receivedMessages` store (recipient) or `messageQueue` store (sender)
- if item is from `messageQueue`, display option to remove the mssage (cancel sending)



## Stores



### messageQueue
This will act as the sender's display and provide an ability to cancel sending messages. Messages sent will be removed and not shown in the middle ("sender") display.

- allow string data entry
- save all entered data to store
- wait 5 seconds and allow user to remove the item before then
- if 5 seconds passes, dispatch data to nodejs with `fetch()`
- dispatched data shall include a ID that allows chronological sorting. Just use a non-persistent ID that starts from 0 whenever page reloads.
- if server replies all is good, send data to `sentMessages` and remove from this store



### sentMessages
Because I don't have the time to overengineer this properly, the sender will only be able to see messages they sent via an auxiliary component. This doesn't keep in sync with the server and is just here for display purposes.

- allow receiving data with id/string
- render message items based on stored data
- initial state never loads anything
- data never expires



### receivedMessages
This will act as the "real" redux store of a recipient.

- On a loop, check against the server for updates
- Whenever server has new data, fetch it all
- render message items based on what's in this store
- dispatch a notification 
- initial state is fetch from server