module.exports = [
    {
        field: 'name',
        max: 20,
        min: 5,
        regex: /^[A-z\u00C0-\u00FF]{2,} [A-z\u00C0-\u00FF]{2,}$/,
    },
    {
        field: 'username',
        max: 20,
        min: 2,
        regex: /^\w{2,20}$/,
        unique: true,
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