const bitcoinMessage = require('bitcoinjs-message')

const address = '17RebJGPcUX3z7zoWJdmUgkBbvZ7BAKPCB'
const signature_1 = 'HJLQlDWLyb1Ef8bQKEISzFbDAKctIlaqOpGbrk3YVtRsjmC61lpE5ErkPRUFtDKtx98vHFGUWlFhsh3DiW6N0rE'
const signature_2 = 'IFn36Idac3dLo3JvQ8/+AMfgQXbj9h3WIjDXJSUO+0ZbSOVEMhQK+t6RU3CC7ECvq9QshbRtLMLThDfCxa1RkYM='
const signature_3 = 'ICcppPF+jJ+9NlvssL+qfcZP9VRbcBq8Drpw91vo+Z5hHkBuLTy+9q70u+Roi03XUIIRw+x9TU5K6FFm6Dhu718='
const message = 'The Times 03/Jan/2009 Chancellor on brink of second bailout for banks.'

console.log('Sig 1', bitcoinMessage.verify(message, address, signature_1))
console.log('Sig 2', bitcoinMessage.verify(message, address, signature_2))
console.log('Sig 3', bitcoinMessage.verify(message, address, signature_3))
