const crypto = require('crypto')

module.exports = class Crypt
{
    constructor(iv, key, algorithm)
    {
        this.algorithm = algorithm
        this.iv = iv
        this.key = key
    }

    encrypt(text) 
    {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.key), this.iv);
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return encrypted.toString('hex');
    }

    decrypt(text)
    {
        try
        {
            const encryptedText = Buffer.from(text, 'hex');
            const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.key), this.iv);
            let decrypted = decipher.update(encryptedText);
            decrypted = Buffer.concat([decrypted, decipher.final()]);
            return decrypted.toString();
        }
        catch(e)
        {
            console.log('Erro durante a descriptografia')
        }
    }
}