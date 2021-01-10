import React from 'react';
import styles from './UserList.module.css';
import Button, {variantTypes} from "../../../../shared/components/Button/Button";

const UserList = ({ users, onDelete, onUpdate }) => (
    <table className={styles.table}>
        <thead>
        <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email ID</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {!!users?.length ? users.map((user) => (
            <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
                <td>
                    <Button
                        title="Edit"
                        customStyles={{ button: styles.actionButton }}
                        onClick={() => onUpdate(user)}
                    />
                    <Button
                        title="Delete"
                        variant={variantTypes.danger}
                        customStyles={{ button: styles.actionButton }}
                        onClick={() => onDelete(user)}
                    />
                </td>
            </tr>
        )) :
            <tr className={styles.emptyRow}>
                <td colSpan={4}>No records available</td>
            </tr>
        }
        </tbody>
    </table>
)

export default UserList;
