import React, {FC, useEffect} from 'react';
import { useProfileUserQuery } from '../store/authApi';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHook';

const Profile: FC = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user);
    const {data: profile} = useProfileUserQuery(user && user._id)

    return (
        <div>
           profile 999
        </div>
    );
};

export default Profile;