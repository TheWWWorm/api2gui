export default [
    {
        name: 'Get all data',
        method: 'GET',
        url: 'http://rest.learncode.academy/api/nightman/things'
    },
    {
        name: 'Post things',
        method: 'POST',
        url: 'http://rest.learncode.academy/api/nightman/things',
        fields: [
            {
                name: 'Name',
                type: 'text'
            },
            {
                name: 'Password',
                type: 'password'
            }
        ]
    },
    {
        name: 'Update things',
        method: 'UPDATE',
        url: 'http://rest.learncode.academy/api/nightman/things/:id',
        fields: [
            {
                name: 'ID',
                type: 'text'
            }
        ]
    },
    {
        name: 'Delete things',
        method: 'DELETE ',
        url: 'http://rest.learncode.academy/api/nightman/things:id',
        fields: [
            {
                name: 'ID',
                type: 'text'
            }
        ]
    }
];