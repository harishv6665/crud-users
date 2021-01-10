import { Machine } from 'xstate';

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
        },
        DELETE: {
          target: 'deleting'
        },
      }
    },
    creating: {
      on: {
        COMMIT_ADD: {
          target: 'idle'
        },
        CANCEL: {
            target: 'idle'
          }
      }
    },
    editing: {
      on: {
        COMMIT_EDIT: {
          target: 'idle'
        },
        CANCEL: {
            target: 'idle'
          }
      }
    },
    deleting: {
      on: {
        COMMIT_DELETE: {
          target: 'idle'
        },
        CANCEL: {
            target: 'idle'
          }
      }
    }
  },
});

export default usersMachine;