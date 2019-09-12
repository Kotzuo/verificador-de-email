const crypto = require('crypto')

let a, i, k

exports.crypt = (iv, key, algorithm) =>
{
    i = iv
    a = algorithm
    k = key
}

exports.encrypt = (text) =>
{
    const cipher = crypto.createCipheriv(a, Buffer.from(k), i)
    let encrypted = cipher.update(text)
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString('hex')
}

exports.decrypt = (text) =>
{
    try
    {
        const encryptedText = Buffer.from(text, 'hex')
        const decipher = crypto.createDecipheriv(a, Buffer.from(k), i)
        let decrypted = decipher.update(encryptedText)
        decrypted = Buffer.concat([decrypted, decipher.final()])
        return decrypted.toString()
    }
    catch(e)
    {
        console.log('Erro durante a descriptografia')
    }
}