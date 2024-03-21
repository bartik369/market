import React, {FC, useEffect} from 'react';
import { useProfileUserQuery } from '../../store/authApi';
import { useAppSelector} from '../../hooks/reduxHook';

const Profile: FC = () => {
    const user = useAppSelector(state => state.auth.user);
    const {data: profile} = useProfileUserQuery(user._id)

    console.log('render profile')

    return (
        <div>
           {profile && 
            <div>
                <div>{profile._id}</div>
                <div>{profile.email}</div>
            </div>
           }
        </div>
    );
};

export default Profile;