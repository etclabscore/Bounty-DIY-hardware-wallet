const {
  RequestManager,
  HTTPTransport,
  Client,
} = require('@open-rpc/client-js');
const { stringToHex, numberToHex } = require('@etclabscore/eserialize');
const transport = new HTTPTransport('http://localhost:1999');
const client = new Client(new RequestManager([transport]));
const client2 = new (require('@etclabscore/signatory-client').default)({
  transport: { type: 'http', host: 'localhost', port: '1999' },
});
const assert = require('assert');
const ethUtil = require('ethereumjs-util');
require('dotenv').config();

(async function() {
  const passphrase = 'passphrase8';

  const mnemonic =
    process.env.MNEMONIC || (await client.request('generateMnemonic', []));
  console.log('mnemonic(%s)', mnemonic);

  const walletUUID = await client.request('importMnemonic', [
    {
      name: 'Default',
      passphrase,
      mnemonic,
      hdPath: "m/44'/61'/0'/0", // eslint-disable-line quotes
    },
  ]);
  console.log('created wallet uuid(%s)', walletUUID);

  const createdAccountAddress = await client.request('getAccountFromMnemonic', [
    {
      uuid: walletUUID,
      passphrase,
      index: 0,
    },
  ]);
  console.log('created account address(%s)', createdAccountAddress);

  const accounts = await client.request('listAccounts', []);
  assert(accounts.find(account => account.address === createdAccountAddress));

  const chainId = 1;

  const message = 'ETC rules! 🥳🎉';
  const messageHex = stringToHex(message);
  // const messageSignature = await client.request('sign', [
  //   {
  //     dataToSign: messageHex,
  //     address: createdAccountAddress,
  //     passphrase,
  //     chainId: numberToHex(chainId),
  //   },
  // ]);
  const messageSignature = await client.request('sign', [
    messageHex,
    createdAccountAddress,
    passphrase,
    numberToHex(chainId),
  ]);
  console.log(
    'message(%s) hex(%s) signature(%o)',
    message,
    messageHex,
    messageSignature
  );

  // verify
  const sigParams = ethUtil.fromRpcSig(messageSignature);
  const msgHash = ethUtil.hashPersonalMessage(Buffer.from(message));
  const pubKey = ethUtil.ecrecover(
    msgHash,
    sigParams.v,
    sigParams.r,
    sigParams.s,
    chainId
  );
  // const verifiedAddress = (
  //   '0x' +
  //   ethUtil
  //     .keccak256(pubKey)
  //     .slice(-20)
  //     .toString('hex')
  // );

  console.log(
    await client2.sign(
      messageHex,
      createdAccountAddress,
      passphrase,
      numberToHex(chainId)
    )
  );

  const verifiedAddress =
    '0x' + ethUtil.publicToAddress(pubKey).toString('hex');
  console.log('verified (%s) (%s)', createdAccountAddress, verifiedAddress);
})();
