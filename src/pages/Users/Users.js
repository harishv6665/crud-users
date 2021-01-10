import React from 'react';
import Button from "../../shared/components/Button/Button";
import UserList from "./components/UserList/UserList";
import CreateUpdateModal from "./components/CreateUpdateModal/CreateUpdateModal";
import styles from './Users.module.css';
import DeleteModal from "./components/DeleteModal/DeleteModal";

const Users = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.actionBar}>
                <Button
                    title="Add"
                    customStyles={{ button: styles.addButton }}
                    onClick={() => {}}
                />
            </div>
            <div className={styles.content}>
                <UserList
                    users={[]}
                    onDelete={() => {}}
                    onUpdate={() => {}}
                />
                {false && <CreateUpdateModal
                    user={{}}
                    onSubmit={() => {}}
                    onCancel={() => {}}
                />}
                {false && <DeleteModal
                    user={{}}
                    onSubmit={() => {}}
                    onCancel={() => {}}
                />}
            </div>
        </div>
    );
}

export default Users;
