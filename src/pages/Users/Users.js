import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from "../../shared/components/Button/Button";
import UserList from "./components/UserList/UserList";
import CreateUpdateModal from "./components/CreateUpdateModal/CreateUpdateModal";
import Input from "../../shared/components/Input/Input";
import styles from './Users.module.css';
import DeleteModal from "./components/DeleteModal/DeleteModal";
import useUsers from "./useUsers";

const Users = () => {
    const users = useSelector(state => state.users.list);
    const [searchKey, setSearchKey] = useState("");
    const {
        activatedUser,
        showCreateUpdateModal,
        setShowCreateUpdateModal,
        showDeleteModal,
        onUpdateToggle,
        onDeleteToggle,
        onConfirmCreateUpdate,
        onConfirmDelete,
        closeModal,
    } = useUsers(users)

    const getFilteredUsers = () => {
        if (searchKey.length) {
            const key = searchKey.toUpperCase();
            return users.filter(user =>
                user.firstName.toUpperCase().includes(key) ||
                user.lastName.toUpperCase().includes(key) ||
                user.email.toUpperCase().includes(key)
            )
        }
        return users;
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.actionBar}>
                <Input
                    type="search"
                    placeholder="Search"
                    value={searchKey}
                    onChange={e => setSearchKey(e.target.value)}
                    customStyles={{ input: styles.searchInput }}
                />
                <Button
                    title="Add"
                    customStyles={{ button: styles.addButton }}
                    onClick={() => setShowCreateUpdateModal(true)}
                />
            </div>
            <div className={styles.content}>
                <UserList
                    users={getFilteredUsers()}
                    onDelete={onDeleteToggle}
                    onUpdate={onUpdateToggle}
                />
                {showCreateUpdateModal && <CreateUpdateModal
                    user={activatedUser}
                    onSubmit={onConfirmCreateUpdate}
                    onCancel={closeModal}
                />}
                {showDeleteModal && <DeleteModal
                    user={activatedUser}
                    onSubmit={onConfirmDelete}
                    onCancel={closeModal}
                />}
            </div>
        </div>
    );
}

export default Users;
