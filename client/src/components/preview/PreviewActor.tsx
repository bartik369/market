import React, {FC} from 'react';

interface PreviewActorProps {
    createActorHandler: () => void
}

const PreviewActor: FC<PreviewActorProps> = ({createActorHandler}) => {
    return (
        <div>
            <button onClick={() => createActorHandler()}>Create</button>
        </div>
    );
};

export default PreviewActor;