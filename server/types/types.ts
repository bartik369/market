export interface IAccessToken {
    user: {
        _id: string;
        email: string;
        roles: string[];
        member: string[];
    }
}
export interface IUserDecoded {
    _id: string;
    email: string;
    roles: string[];
    member: string[];
}