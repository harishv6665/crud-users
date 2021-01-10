import { Machine, assign } from 'xstate';
import uuid from 'uuid-v4';

const usersMachine = Machine({
  id: 'users',
  initial: 'idle',
  context: {
    users: [
      {
        "id": "0191a40d-910b-4c01-90a0-deb1675bcc98",
        "firstName": "Shannen",
        "lastName": "Moryson",
        "email": "smoryson0@nasa.gov"
      }, {
        "id": "d63a4944-1a26-43d5-9ef5-ca2a20da3b1f",
        "firstName": "Rosco",
        "lastName": "Edowes",
        "email": "redowes1@fotki.com"
      }, {
        "id": "df366459-8af4-470a-a4f8-4aca24c03efd",
        "firstName": "Iorgo",
        "lastName": "Bernardeschi",
        "email": "ibernardeschi2@amazon.de"
      }, {
        "id": "43a4b471-1744-407a-9765-ea6e8f31ff75",
        "firstName": "Chad",
        "lastName": "Giovanardi",
        "email": "cgiovanardi3@posterous.com"
      }, {
        "id": "fc20b0fa-757b-49dc-902e-21d24fc64020",
        "firstName": "Elna",
        "lastName": "Bahike",
        "email": "ebahike4@nationalgeographic.com"
      }, {
        "id": "f3ceb4b5-7494-416e-a4ea-42c01907665b",
        "firstName": "Elmore",
        "lastName": "Ratnege",
        "email": "eratnege5@meetup.com"
      }
    ],
    activatedUser: {}
  },
  states: {
    idle: {
      on: {
        ADD: {
          target: 'creating',
        },
        EDIT: {
          target: 'editing',
          actions: assign((_, {user}) => ({
            activatedUser: user
          }))
        },
        DELETE: {
          target: 'deleting',
          actions: assign((_, {user}) => ({
            activatedUser: user
          }))
        },
      }
    },
    creating: {
      on: {
        COMMIT_ADD: {
          target: 'idle',
          actions: assign(({users}, {user}) => ({
              users: [...users, {id: uuid(), ...user}]
            })
          ),
        }
      }
    },
    editing: {
      on: {
        COMMIT_EDIT: {
          target: 'idle',
          actions: assign(({users}, {user}) => ({
              users: users.map(u => u.id === user.id ? user : u),
              activatedUser: {}
            })
          ),
        },
      }
    },
    deleting: {
      on: {
        COMMIT_DELETE: {
          target: 'idle',
          actions: assign(({users, activatedUser}) => ({
            users: users.filter(user => user.id !== activatedUser.id),
            activatedUser: {}
          })),
        },
      }
    }
  },
  on: {
    CANCEL: {
        target: 'idle',
        actions: assign({ activatedUser: {}})
    }
  }
});

export default usersMachine;