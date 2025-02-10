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

mutation {
    loginUser(username: "Emerson", password: "321123") {
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

query {
    checkCurrentUser {
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

mutation {
    logout {
        message
    }
}

 */
