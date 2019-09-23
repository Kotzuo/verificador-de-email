exports.validate = (object) =>
{
    const validName = object.name !== null && typeof object.name === 'string'
    const validEmail = object.email !== null && typeof object.email === 'string'
    const validPassword = object.password !== null && typeof object.password === 'string'
    return validName && validEmail && validPassword
}