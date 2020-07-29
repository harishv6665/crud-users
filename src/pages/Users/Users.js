import React from 'react';
import {connect} from 'react-redux';
import {
    createUser,
    deleteUser,
    updateUser,
} from './UsersSlice';
import Button from "../../shared/components/Button/Button";
import UserList from "./components/UserList/UserList";
import CreateUpdateModal from "./components/CreateUpdateModal/CreateUpdateModal";
import Input from "../../shared/components/Input/Input";
import styles from './Users.module.css';
import DeleteModal from "./components/DeleteModal/DeleteModal";

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            showDeleteModal: false,
            showCreateUpdateModal: false,
            activatedUser: null,
        }
        this.closeModal = this.closeModal.bind(this);
        this.onCreateToggle = this.onCreateToggle.bind(this);
        this.onUpdateToggle = this.onUpdateToggle.bind(this);
        this.onDeleteToggle = this.onDeleteToggle.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onConfirmDelete = this.onConfirmDelete.bind(this);
        this.getFilteredUsers = this.getFilteredUsers.bind(this);
        this.onConfirmCreateUpdate = this.onConfirmCreateUpdate.bind(this);
    }

    onCreateToggle = () => {
        this.setState({ showCreateUpdateModal: true });
    }

    onUpdateToggle(id) {
        this.setState({
            showCreateUpdateModal: true,
            activatedUser: this.props.users.find(user => user.id === id)
        })
    }

    onDeleteToggle(id) {
        this.setState({
            showDeleteModal: true,
            activatedUser: this.props.users.find(user => user.id === id)
        })
    }

    closeModal() {
        this.setState({
            showDeleteModal: false,
            showCreateUpdateModal: false,
            activatedUser: null
        })
    }

    onSearchChange(e) {
        this.setState({ searchKey: e.target.value });
    }

    getFilteredUsers() {
        const { searchKey } = this.state;
        if (searchKey.length) {
            const key = searchKey.toUpperCase();
            return this.props.users.filter(user =>
                user.firstName.toUpperCase().includes(key) ||
                user.lastName.toUpperCase().includes(key) ||
                user.email.toUpperCase().includes(key)
            )
        }
        return this.props.users;
    }

    onConfirmCreateUpdate({ mode, user }) {
        if (mode === 'CREATE') {
            this.props.createUser({user});
        }
        if (mode === 'UPDATE') {
            this.props.updateUser({user});
        }
        this.closeModal();
    }

    onConfirmDelete(id) {
        this.props.deleteUser({userId: id});
        this.closeModal();
    }

    render() {
        const { showDeleteModal, showCreateUpdateModal, activatedUser } = this.state;
        return (
            <div className={styles.wrapper}>
                <div className={styles.actionBar}>
                    <Input
                        type="search"
                        placeholder="Search"
                        onChange={this.onSearchChange}
                        customStyles={{ input: styles.searchInput }}
                    />
                    <Button
                        title="Add"
                        customStyles={{ button: styles.addButton }}
                        onClick={this.onCreateToggle}
                    />
                </div>
                <div className={styles.content}>
                    <UserList
                        users={this.getFilteredUsers()}
                        onDelete={this.onDeleteToggle}
                        onUpdate={this.onUpdateToggle}
                    />
                    {showCreateUpdateModal && <CreateUpdateModal
                        user={activatedUser}
                        onSubmit={this.onConfirmCreateUpdate}
                        onCancel={this.closeModal}
                    />}
                    {showDeleteModal && <DeleteModal
                        user={activatedUser}
                        onSubmit={this.onConfirmDelete}
                        onCancel={this.closeModal}
                    />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.users.list
});

const mapDispatchToProps = dispatch => ({
    createUser: payload => dispatch(createUser(payload)),
    deleteUser: payload => dispatch(deleteUser(payload)),
    updateUser: payload => dispatch(updateUser(payload)),
});


export default connect(
    mapStateToProps, mapDispatchToProps
)(Users);
