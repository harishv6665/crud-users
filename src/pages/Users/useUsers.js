import { useState } from "react";
import { createUser, deleteUser, updateUser } from "./UsersSlice";
import {useDispatch} from "react-redux";

const useUsers = (users) => {
    const [activatedUser, setActivatedUser] = useState(null);
    const [showCreateUpdateModal, setShowCreateUpdateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const dispatch = useDispatch();

    const onUpdateToggle = (id) => {
        setShowCreateUpdateModal(true);
        setActivatedUser(users.find(user => user.id === id));
    }

    const onDeleteToggle = (id) => {
        setShowDeleteModal(true);
        setActivatedUser(users.find(user => user.id === id));
    }

    const closeModal = () => {
        setShowCreateUpdateModal(false);
        setShowDeleteModal(false);
        setActivatedUser(null);
    }

    const onConfirmCreateUpdate = ({ mode, user }) => {
        if (mode === 'CREATE') {
            dispatch(createUser({user}));
        }
        if (mode === 'UPDATE') {
            dispatch(updateUser({user}));
        }
        closeModal();
    }

    const onConfirmDelete = (id) => {
        dispatch(deleteUser({userId: id}));
        closeModal();
    }

    return {
        activatedUser,
        setActivatedUser,
        showCreateUpdateModal,
        setShowCreateUpdateModal,
        showDeleteModal,
        setShowDeleteModal,
        onUpdateToggle,
        onDeleteToggle,
        onConfirmCreateUpdate,
        onConfirmDelete,
        closeModal,
    }
}

export default useUsers;
