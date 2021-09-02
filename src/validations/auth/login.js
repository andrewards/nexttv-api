module.exports = [
    {
        field: 'username',
        max: 20,
        min: 2,
        regex: /^\w{2,20}$/,
    },
    {
        field: 'password',
        max: 24,
        min: 8,
        regex: [
            /[A-z]+/,
            /[0-9]+/,
        ],
    }
]