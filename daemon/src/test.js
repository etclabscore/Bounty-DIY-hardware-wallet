const {
  RequestManager,
  HTTPTransport,
  Client
} = require("@open-rpc/client-js");
const transport = new HTTPTransport("http://localhost:1999");
const client = new Client(new RequestManager([transport]));

(async function() {
  const mnemonic = await client.request("generateMnemonic", []);
  console.log(mnemonic);
})();
