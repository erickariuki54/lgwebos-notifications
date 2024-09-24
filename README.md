# LG webOS TV Notification Server

This is a Node.js server that connects to an LG webOS TV and sends notifications (toast messages) using the `lgtv2` library. The server listens for POST requests to send messages from the client to the TV.

## Features
- Connects to an LG webOS TV using WebSocket.
- Sends toast notifications with customizable messages.
- Can be extended to send more complex notifications (e.g., images or alerts).

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- Your LG webOS TV must be on the same network and configured to allow remote control.
- The IP address of your LG webOS TV.

## Installation

1. Clone the repository or download the project files.

   ```bash
   git clone https://github.com/erickariuki54/lgwebos-notifications.git
   cd lgwebos-notifications
   ```

2. Install the required dependencies by running:

   ```bash
   npm install
   ```

## Usage

1. Update the TV's IP address in the code:

   Open the `app.js` file (or whichever file contains the server code) and modify the following line to use your LG webOS TV's IP address:

   ```javascript
   const lgtv = require('lgtv2')({
       url: 'ws://<TV-IP-ADDRESS>:3000'  // Replace with your TV's IP
   });
   ```

2. Start the server:

   Run the server using:

   ```bash
   node app.js
   ```

   The server will start listening on port `3000` (or a different port specified in the code).

3. Send a notification:

   You can send a POST request to the server's `/tvnotification` endpoint with a JSON body that contains a message to be displayed on the TV.

   Example request using **Postman** or **curl**:

   ```bash
   curl -X POST http://localhost:3000/tvnotification \
   -H "Content-Type: application/json" \
   -d '{"message": "Hello from Node.js!"}'
   ```

   The TV should display a toast notification with the message.

## Example Request

Here's an example of the JSON body you should send to the `/tvnotification` endpoint:

```json
{
    "message": "Hello from Node.js!"
}
```

## Dependencies

This project uses the following dependencies:

- `express`: A fast web framework for Node.js.
- `body-parser`: Middleware to parse incoming request bodies.
- `lgtv2`: A library to control LG webOS TVs via WebSocket.

To install all the dependencies, simply run:

```bash
npm install
```

## License

This project is licensed under the MIT License.
