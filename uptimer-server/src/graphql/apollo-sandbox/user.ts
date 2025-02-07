/**
mutation {
    registerUser(
        user:{
            username: "Jane",
            email: "jane@mail.com",
            password: "54321"
        }
    ) {
        user {
            id,
            email,
            username,
            createdAt
        }
        notifications {
            id,
            emails,
            groupName
        }
    }
}
 */
